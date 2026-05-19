/**
 * GenjinIndenter — indentador dedicado para a linguagem .gnj (genjin=true)
 *
 * Contextos (estados da máquina):
 *  root          — nível superior do arquivo
 *  root_seq      — sequência inline de @proc() no raiz
 *  vars          — interior de vars { }
 *  procs         — interior de procs { }
 *  procs_import  — linhas de nomes após "from X import"
 *  proc_def      — corpo de um proc-bloco dentro de procs { }
 *  proc_def_seq  — sequência inline de @proc() dentro de proc_def
 *  exec          — interior de exec { } (qualquer nível de aninhamento)
 *                  campos: depth, inCaseBody, caseBodyDepth, anchorCol
 *  exec_args     — argumentos multi-linha de exec(…)
 *
 * Regra central de profundidade:
 *  • exec em profundidade D: case em pad(D+1), conteúdo de case em pad(D+2)
 *  • exec aninhado herda caseBodyDepth como sua própria profundidade
 *  • } fecha exec em pad(D) e reseta inCaseBody no pai
 *
 * @param {string} space — string de recuo por nível (padrão '    ', 4 espaços)
 */

class GenjinIndenter {

  indent(source, space = '    ') {
    const lines  = source.split('\n');
    const output = [];

    const RE_VARS_OPEN   = /^\s*vars\s*\{/;
    const RE_PROCS_OPEN  = /^\s*procs\s*\{/;
    const RE_EXEC_OPEN   = /^\s*exec\b/;
    const RE_CASE_LINE   = /^\s*case\s+/;
    const RE_AT_CALL     = /^\s*@/;
    const RE_PASS_LINE   = /^\s*pass\b/;
    const RE_BRACE_CLOSE = /^\s*\}/;
    const RE_BLOCK_OPEN  = /\{\s*$/;
    const RE_FROM_IMPORT = /^\s*from\s+/;
    const RE_COMMENT     = /^\s*\/\//;

    const strip = l => l.replace(/^\s+|\s+$/g, '');
    const pad   = n => space.repeat(n);

    // ctx fields by type:
    //   root / vars / procs / procs_import / proc_def:  { type, depth }
    //   root_seq / proc_def_seq:                        { type, depth, anchorCol }
    //   exec:  { type, depth, inCaseBody, caseBodyDepth, anchorCol }
    //   exec_args:                                      { type, depth }
    const stack = [];
    let ctx = { type: 'root', depth: 0 };

    const processLine = (s) => {
      switch (ctx.type) {

        // ── ROOT ──────────────────────────────────────────────────────────────
        case 'root': {
          const d = ctx.depth;
          if (RE_VARS_OPEN.test(s)) {
            output.push(pad(d) + s);
            stack.push(ctx);
            ctx = { type: 'vars', depth: d + 1 };
          } else if (RE_PROCS_OPEN.test(s)) {
            output.push(pad(d) + s);
            stack.push(ctx);
            ctx = { type: 'procs', depth: d + 1 };
          } else if (RE_EXEC_OPEN.test(s)) {
            output.push(pad(d) + s);
            stack.push(ctx);
            if (RE_BLOCK_OPEN.test(s)) {
              ctx = { type: 'exec', depth: d, inCaseBody: false, caseBodyDepth: 0, anchorCol: null };
            } else {
              ctx = { type: 'exec_args', depth: d };
            }
          } else if (RE_AT_CALL.test(s)) {
            const formatted = pad(d) + s;
            output.push(formatted);
            if (/when\s*\(/.test(s)) {
              stack.push(ctx);
              ctx = { type: 'root_seq', depth: d, anchorCol: formatted.indexOf('@') };
            }
          } else {
            output.push(pad(d) + s);
          }
          break;
        }

        // ── ROOT_SEQ ──────────────────────────────────────────────────────────
        case 'root_seq': {
          if (RE_AT_CALL.test(s)) {
            output.push(' '.repeat(ctx.anchorCol) + s);
            if (!/when\s*\(/.test(s)) {
              ctx = stack.pop() || { type: 'root', depth: 0 };
            }
          } else {
            ctx = stack.pop() || { type: 'root', depth: 0 };
            processLine(s);
          }
          break;
        }

        // ── VARS ──────────────────────────────────────────────────────────────
        case 'vars': {
          const d = ctx.depth;
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(pad(d - 1) + s);
            ctx = stack.pop() || { type: 'root', depth: 0 };
          } else {
            output.push(pad(d) + s);
          }
          break;
        }

        // ── PROCS ─────────────────────────────────────────────────────────────
        case 'procs': {
          const d = ctx.depth;
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(pad(d - 1) + s);
            ctx = stack.pop() || { type: 'root', depth: 0 };
          } else if (RE_BLOCK_OPEN.test(s)) {
            // Declaração de proc (with/from) ou proc-bloco — abre corpo
            output.push(pad(d) + s);
            stack.push(ctx);
            ctx = { type: 'proc_def', depth: d + 1 };
          } else if (RE_FROM_IMPORT.test(s)) {
            output.push(pad(d) + s);
            if (/import\s*$/.test(s)) {
              // "from X import" sem nomes na mesma linha — próximas linhas são nomes
              stack.push(ctx);
              ctx = { type: 'procs_import', depth: d + 1 };
            }
          } else {
            output.push(pad(d) + s);
          }
          break;
        }

        // ── PROCS_IMPORT ──────────────────────────────────────────────────────
        case 'procs_import': {
          // Termina ao encontrar } ou comentário; tudo mais é nome de import
          if (RE_BRACE_CLOSE.test(s) || RE_COMMENT.test(s)) {
            ctx = stack.pop() || { type: 'procs', depth: 1 };
            processLine(s);
          } else {
            output.push(pad(ctx.depth) + s);
          }
          break;
        }

        // ── PROC_DEF ──────────────────────────────────────────────────────────
        case 'proc_def': {
          const d = ctx.depth;
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(pad(d - 1) + s);
            ctx = stack.pop() || { type: 'procs', depth: 1 };
          } else if (RE_EXEC_OPEN.test(s)) {
            output.push(pad(d) + s);
            stack.push(ctx);
            if (RE_BLOCK_OPEN.test(s)) {
              ctx = { type: 'exec', depth: d, inCaseBody: false, caseBodyDepth: 0, anchorCol: null };
            } else {
              ctx = { type: 'exec_args', depth: d };
            }
          } else if (RE_AT_CALL.test(s)) {
            const formatted = pad(d) + s;
            output.push(formatted);
            if (/when\s*\(/.test(s)) {
              stack.push(ctx);
              ctx = { type: 'proc_def_seq', depth: d, anchorCol: formatted.indexOf('@') };
            }
          } else {
            output.push(pad(d) + s);
          }
          break;
        }

        // ── PROC_DEF_SEQ ──────────────────────────────────────────────────────
        case 'proc_def_seq': {
          if (RE_AT_CALL.test(s)) {
            output.push(' '.repeat(ctx.anchorCol) + s);
            if (!/when\s*\(/.test(s)) {
              ctx = stack.pop() || { type: 'proc_def', depth: 2 };
            }
          } else {
            ctx = stack.pop() || { type: 'proc_def', depth: 2 };
            processLine(s);
          }
          break;
        }

        // ── EXEC ──────────────────────────────────────────────────────────────
        // depth D: } em pad(D), case em pad(D+1), conteúdo de case em pad(D+2)
        // inCaseBody: true após case X: até o conteúdo ser consumido
        case 'exec': {
          const d = ctx.depth;
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(pad(d) + s);
            const parent = stack.pop() || { type: 'root', depth: 0 };
            // Ao retornar de um exec aninhado para outro exec, encerra o case body pai
            if (parent.type === 'exec') {
              parent.inCaseBody = false;
              parent.anchorCol  = null;
            }
            ctx = parent;
          } else if (RE_CASE_LINE.test(s)) {
            const formatted = pad(d + 1) + s;
            output.push(formatted);
            ctx.inCaseBody    = true;
            ctx.caseBodyDepth = d + 2;
            // Âncora somente se a própria linha de case contiver @
            const atIdx = formatted.indexOf('@');
            ctx.anchorCol = atIdx !== -1 ? atIdx : null;
          } else if (RE_PASS_LINE.test(s)) {
            output.push(pad(d + 1) + s);
            ctx.inCaseBody = false;
            ctx.anchorCol  = null;
          } else if (ctx.inCaseBody) {
            const cbd = ctx.caseBodyDepth;
            if (RE_EXEC_OPEN.test(s)) {
              output.push(pad(cbd) + s);
              stack.push(ctx);
              if (RE_BLOCK_OPEN.test(s)) {
                ctx = { type: 'exec', depth: cbd, inCaseBody: false, caseBodyDepth: 0, anchorCol: null };
              } else {
                ctx = { type: 'exec_args', depth: cbd };
              }
            } else if (RE_AT_CALL.test(s)) {
              if (ctx.anchorCol !== null) {
                output.push(' '.repeat(ctx.anchorCol) + s);
              } else {
                const formatted = pad(cbd) + s;
                output.push(formatted);
                ctx.anchorCol = formatted.indexOf('@');
              }
              if (!/when\s*\(/.test(s)) {
                ctx.inCaseBody = false;
                ctx.anchorCol  = null;
              }
            } else {
              output.push(pad(cbd) + s);
            }
          } else {
            // Fora de case body (entre cases, comentários, etc.)
            output.push(pad(d + 1) + s);
          }
          break;
        }

        // ── EXEC_ARGS ─────────────────────────────────────────────────────────
        // Argumentos multi-linha de exec(…): continuação em pad(depth+1)
        // Linha com { no final é o fechamento: ") as "..." {"
        case 'exec_args': {
          const d = ctx.depth;
          if (RE_BLOCK_OPEN.test(s)) {
            // Última linha dos args; abre o bloco exec
            output.push(pad(d) + s);
            ctx.type          = 'exec';
            ctx.inCaseBody    = false;
            ctx.caseBodyDepth = 0;
            ctx.anchorCol     = null;
          } else {
            output.push(pad(d + 1) + s);
          }
          break;
        }

        default:
          output.push(s);
      }
    };

    for (const rawLine of lines) {
      const s = strip(rawLine);
      if (s === '') {
        output.push('');
        continue;
      }
      processLine(s);
    }

    return output.join('\n');
  }
}

export default GenjinIndenter;

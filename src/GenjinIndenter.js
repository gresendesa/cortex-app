/**
 * GenjinIndenter — indentador dedicado para a linguagem .gnj (genjin=true)
 *
 * Regras:
 *  - program "nome"              → col 0
 *  - vars { }                    → conteúdo em `space`
 *  - procs { }                   → defs em `space`, corpo em `space x2`
 *  - exec Proc(...) { }          → conteúdo em `space`
 *    - case CODE: @proc()        → `space`; @ define anchor_col para a sequência
 *    - átomos @proc() seguintes  → padding até anchor_col
 *    - pass CODE                 → `space`
 *  - sequência inline raiz       → primeiro @ em col 0; átomos seguintes em anchor_col
 *
 * @param {string} space — string de recuo por nível (padrão: '  ', 2 espaços)
 */

class GenjinIndenter {

  indent(source, space = '  ') {
    const lines = source.split('\n');
    const output = [];

    const RE_VARS_OPEN   = /^\s*vars\s*\{/;
    const RE_PROCS_OPEN  = /^\s*procs\s*\{/;
    const RE_EXEC_OPEN   = /^\s*exec\b/;
    const RE_CASE_LINE   = /^\s*case\s+\w+\s*:/;
    const RE_AT_CALL     = /^\s*@\w+/;
    const RE_PASS_LINE   = /^\s*pass\b/;
    const RE_BRACE_CLOSE = /^\s*\}/;
    const RE_BLOCK_OPEN  = /\{\s*$/;

    const strip = l => l.replace(/^\s+|\s+$/g, '');

    const stack = [];
    let ctx = { type: 'root' };

    const dispatchRoot = (s) => {
      if (RE_VARS_OPEN.test(s)) {
        output.push(s);
        stack.push(ctx);
        ctx = { type: 'vars' };
      } else if (RE_PROCS_OPEN.test(s)) {
        output.push(s);
        stack.push(ctx);
        ctx = { type: 'procs' };
      } else if (RE_EXEC_OPEN.test(s)) {
        output.push(s);
        stack.push(ctx);
        ctx = { type: 'exec' };
      } else if (RE_AT_CALL.test(s)) {
        output.push(s);
        if (/when\s*\(/.test(s)) {
          stack.push(ctx);
          ctx = { type: 'root_seq', anchorCol: s.indexOf('@') };
        }
      } else {
        output.push(s);
      }
    };

    for (const rawLine of lines) {
      const s = strip(rawLine);

      if (s === '') {
        output.push('');
        continue;
      }

      switch (ctx.type) {

        case 'root': {
          dispatchRoot(s);
          break;
        }

        case 'root_seq': {
          if (RE_AT_CALL.test(s)) {
            output.push(' '.repeat(ctx.anchorCol) + strip(s));
            if (!/when\s*\(/.test(s)) {
              ctx = stack.pop() || { type: 'root' };
            }
          } else {
            ctx = stack.pop() || { type: 'root' };
            dispatchRoot(s);
          }
          break;
        }

        case 'exec': {
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(s);
            ctx = stack.pop() || { type: 'root' };
          } else if (RE_CASE_LINE.test(s)) {
            const formatted = space + s;
            output.push(formatted);
            const atIdx = formatted.indexOf('@');
            stack.push(ctx);
            ctx = { type: 'case_seq', anchorCol: atIdx !== -1 ? atIdx : null };
          } else if (RE_PASS_LINE.test(s)) {
            output.push(space + s);
          } else {
            output.push(space + s);
          }
          break;
        }

        case 'case_seq': {
          if (RE_BRACE_CLOSE.test(s)) {
            ctx = stack.pop() || { type: 'root' }; // exec
            ctx = stack.pop() || { type: 'root' }; // parent
            output.push(s);
          } else if (RE_CASE_LINE.test(s)) {
            ctx = stack.pop() || { type: 'root' }; // exec
            const formatted = space + s;
            output.push(formatted);
            const atIdx = formatted.indexOf('@');
            stack.push(ctx);
            ctx = { type: 'case_seq', anchorCol: atIdx !== -1 ? atIdx : null };
          } else if (RE_PASS_LINE.test(s)) {
            ctx = stack.pop() || { type: 'root' }; // exec
            output.push(space + s);
          } else if (RE_AT_CALL.test(s)) {
            if (ctx.anchorCol !== null) {
              output.push(' '.repeat(ctx.anchorCol) + strip(s));
            } else {
              // case line tinha @ ausente — primeiro @ nesta linha define o anchor
              const formatted = space + strip(s);
              output.push(formatted);
              ctx.anchorCol = formatted.indexOf('@');
            }
          } else {
            output.push(space + s);
          }
          break;
        }

        case 'vars': {
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(s);
            ctx = stack.pop() || { type: 'root' };
          } else {
            output.push(space + s);
          }
          break;
        }

        case 'procs': {
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(s);
            ctx = stack.pop() || { type: 'root' };
          } else if (RE_BLOCK_OPEN.test(s)) {
            output.push(space + s);
            stack.push(ctx);
            ctx = { type: 'proc_def' };
          } else {
            output.push(space + s);
          }
          break;
        }

        case 'proc_def': {
          if (RE_BRACE_CLOSE.test(s)) {
            output.push(space + s);
            ctx = stack.pop() || { type: 'procs' };
          } else {
            output.push(space + space + s);
          }
          break;
        }

        default:
          output.push(s);
      }
    }

    return output.join('\n');
  }
}

export default GenjinIndenter;

import 'brace/mode/java';

class GenjinHighlightRules extends window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules {
	constructor() {
		super();

		var oop = window.ace.acequire("ace/lib/oop");
		var TextHighlightRules = window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules;

		var identifierRe = "[a-zA-Z_\u00a1-\uffff][a-zA-Z\\d_\u00a1-\uffff]*";

		var keywordMapper = this.createKeywordMapper({
			"keyword":
				"program|vars|procs|exec|case|pass|while|from|import|as|when|config",
			"keyword.declaration":
				"renderer|logger|pre_execution|post_execution",
			"storage.type":
				"Number|Text|Logic|Object",
			"constant.language.boolean":
				"true|false"
		}, "identifier", true);

		this.$rules = {
			"start": [
				// Comentário de bloco /* ... */
				{
					token: "comment",
					regex: /\/\*/,
					next: "block_comment"
				},
				// Comentário de linha //
				{
					token: "comment",
					regex: /\/\//,
					next: "line_comment"
				},
				// String duplas aspas "..."
				{
					token: "string",
					regex: '"',
					next: "qqstring"
				},
				// Números: inteiros e decimais
				{
					token: "constant.numeric",
					regex: /\d+(?:\.\d*)?/
				},
				// Operador >> (vinculação de variável)
				{
					token: "keyword.operator",
					regex: />>/
				},
				// Operador & prefixo (passagem por referência) e @ (inline)
				{
					token: "keyword.operator",
					regex: /[&@](?=[a-zA-Z_])/
				},
				// Pontuação
				{
					token: "punctuation.operator",
					regex: /[(),:{}\[\]]/
				},
				// Outros operadores
				{
					token: "keyword.operator",
					regex: /[=!<>+\-*\/]/
				},
				// Keyword "codes" — entra em estado dedicado para colorir os identificadores
				{
					token: "keyword",
					regex: /\bcodes\b/,
					next: "codes_list"
				},
				// Keyword "case" — identificadores que seguem são códigos de saída
				{
					token: "keyword",
					regex: /\bcase\b/,
					next: "case_codes"
				},
				// Keyword "while" — argumentos são códigos de saída
				{
					token: "keyword",
					regex: /\bwhile\b/,
					next: "while_codes"
				},
				// Keyword "when" — argumentos são códigos de saída
				{
					token: "keyword",
					regex: /\bwhen\b/,
					next: "when_codes"
				},
				// Keyword "pass" — o identificador que segue é um código de saída
				{
					token: "keyword",
					regex: /\bpass\b/,
					next: "pass_code"
				},
				// Identificadores e palavras reservadas
				{
					token: keywordMapper,
					regex: identifierRe
				},
				// Espaços
				{
					token: "text",
					regex: /\s+/
				}
			],
			// Estado: lista de códigos de saída após "codes"
			// Identificadores recebem variable.output (âmbar + itálico via CSS)
			"codes_list": [
				{ token: "variable.output", regex: /[a-zA-Z_][a-zA-Z\d_]*/ },
				{ token: "constant.numeric", regex: /<\d+>/ },
				{ token: "punctuation.operator", regex: /,/ },
				{ token: "text", regex: /\s+/ },
				{ token: "text", regex: /$/, next: "start" }
			],
			// Estado: lista de códigos após "case CODE1, CODE2:"
			"case_codes": [
				{ token: "variable.output", regex: /[a-zA-Z_][a-zA-Z\d_]*/ },
				{ token: "punctuation.operator", regex: /,/ },
				{ token: "keyword.operator", regex: /:/, next: "start" },
				{ token: "text", regex: /\s+/ },
				{ token: "text", regex: /$/, next: "start" }
			],
			// Estado: lista de códigos em while(CODE1, CODE2)
			"while_codes": [
				{ token: "punctuation.operator", regex: /\(/ },
				{ token: "variable.output", regex: /[a-zA-Z_][a-zA-Z\d_]*/ },
				{ token: "punctuation.operator", regex: /,/ },
				{ token: "punctuation.operator", regex: /\)/, next: "start" },
				{ token: "text", regex: /\s+/ },
				{ token: "text", regex: /$/, next: "start" }
			],
			// Estado: lista de códigos em when(CODE1, CODE2)
			"when_codes": [
				{ token: "punctuation.operator", regex: /\(/ },
				{ token: "variable.output", regex: /[a-zA-Z_][a-zA-Z\d_]*/ },
				{ token: "punctuation.operator", regex: /,/ },
				{ token: "punctuation.operator", regex: /\)/, next: "start" },
				{ token: "text", regex: /\s+/ },
				{ token: "text", regex: /$/, next: "start" }
			],
			// Estado: código de saída único após "pass"
			"pass_code": [
				{ token: "text", regex: /\s+/ },
				{ token: "variable.output", regex: /[a-zA-Z_][a-zA-Z\d_]*/, next: "start" },
				{ token: "text", regex: /$/, next: "start" }
			],
			"qqstring": [
				{
					token: "string",
					regex: /\\./
				},
				{
					token: "string",
					regex: /"|$/,
					next: "start"
				},
				{
					defaultToken: "string"
				}
			],
			"block_comment": [
				{ token: "comment", regex: /\*\//, next: "start" },
				{ defaultToken: "comment" }
			],
			"line_comment": [
				{ token: "comment", regex: /$/, next: "start" },
				{ defaultToken: "comment" }
			]
		};
	}
}

export default class GenjinMode extends window.ace.acequire('ace/mode/java').Mode {
	constructor() {
		super();
		this.HighlightRules = GenjinHighlightRules;
	}
}

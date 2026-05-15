import 'brace/mode/java';

class GenjinHighlightRules extends window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules {
	constructor() {
		super();

		var oop = window.ace.acequire("ace/lib/oop");
		var TextHighlightRules = window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules;

		var identifierRe = "[a-zA-Z_\u00a1-\uffff][a-zA-Z\\d_\u00a1-\uffff]*";

		var keywordMapper = this.createKeywordMapper({
			"keyword":
				"program|vars|procs|exec|case|pass|while|from|import|as|codes|when",
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
					next: [
						{ token: "comment", regex: /\*\//, next: "start" },
						{ defaultToken: "comment" }
					]
				},
				// Comentário de linha //
				{
					token: "comment",
					regex: /\/\//,
					next: [
						{ token: "comment", regex: /$/, next: "start" },
						{ defaultToken: "comment" }
					]
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

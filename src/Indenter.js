if(typeof(String.prototype.jstrip) === "undefined")
{
    String.prototype.jstrip = function() 
    {
        return String(this).replace(/^[\s\n\t\r]+|[\s\n\t\r]+$/g, '');
    };
}

class Indenter {

	constructor(lines) {

		const es = this.escapeRegExp

		const c0 = snippet => `^[ \t\n]*(${snippet})(\\b|$).*?`
		const c1 = snippet => `^.*?(${snippet})[ \t\n]*$`
		const c3 = snippet => `^.*?(${snippet}).*?`

		this.lines = lines;
		this.level = [];
		this.indentation = 0;
		this.statements = [
			['IF','ELSEIF',				c0('IF'),c0('ELSEIF')],
			['IF','ELSE',				c0('IF'),c0('ELSE')],
			['IF','ENDIF',				c0('IF'),c0('ENDIF')],
			['ELSEIF','ELSEIF',			c0('ELSEIF'),c0('ELSEIF')],
			['ELSEIF','ENDIF',			c0('ELSEIF'),c0('ENDIF')],
			['ELSEIF','ELSE',			c0('ELSEIF'),c0('ELSE')],
			['ELSE','ENDIF',			c0('ELSE'),c0('ENDIF')],
			['IFMATCHES','ELSE',		c0('IFMATCHES'),c0('ELSE')],
			['IFMATCHES','ENDIF',		c0('IFMATCHES'),c0('ENDIF')],
			['IFMATCHES','ELSEIF',		c0('IFMATCHES'),c0('ELSEIF')],
			['IFBEGINSWITH','ELSE',		c0('IFBEGINSWITH'),c0('ELSE')],
			['IFBEGINSWITH','ENDIF',	c0('IFBEGINSWITH'),c0('ENDIF')],
			['IFBEGINSWITH','ELSEIF',	c0('IFBEGINSWITH'),c0('ELSEIF')],
			['IFENDSWITH','ELSE',		c0('IFENDSWITH'),c0('ELSE')],
			['IFENDSWITH','ENDIF',		c0('IFENDSWITH'),c0('ENDIF')],
			['IFENDSWITH','ELSEIF',		c0('IFENDSWITH'),c0('ELSEIF')],
			['IFCONTAINS','ELSE',		c0('IFCONTAINS'),c0('ELSE')],
			['IFCONTAINS','ENDIF',		c0('IFCONTAINS'),c0('ENDIF')],
			['IFCONTAINS','ELSEIF',		c0('IFCONTAINS'),c0('ELSEIF')],
			['FOR','NEXT',				c0('FOR'),c0('NEXT')],
			['FOREACH','NEXT',			c0('FOREACH'),c0('NEXT')],
			['DO','UNTIL',				c0('DO'),c0('UNTIL')],
			['DO','WHILE',				c0('DO'),c0('WHILE')],
			['DO','LOOP',				c0('DO'),c0('LOOP')],
			['UNSAFE','ENDUNSAFE',		c0('UNSAFE'),c0('ENDUNSAFE')],
			['{* macro ','{* endmacro ',c0('\\{\\* macro '),c3('\\{\\* endmacro ')],
			['{* block ','{* endblock ',c0('\\{\\* block '),c3('\\{\\* endblock ')],
			['{* macro ','{*- endmacro ',c0('\\{\\* macro '),c3('\\{\\*\\- endmacro ')],
			['{* block ','{*- endblock ',c0('\\{\\* block '),c3('\\{\\*\\- endblock ')],
			
			['{* for ','{* endfor ',c0('\\{\\* for '),c3('\\{\\* endfor ')],

			['{* else ','{* endif ',c0('\\{\\* else '),c3('\\{\\* endif ')],

			['{* if ','{* endif ',c0('\\{\\* if '),c3('\\{\\* endif ')],
			['{* if ','{* elif ',c0('\\{\\* if '),c3('\\{\\* elif ')],
			['{* if ','{* else ',c0('\\{\\* if '),c3('\\{\\* else ')],

			['{* elif ','{* endif ',c0('\\{\\* elif '),c3('\\{\\* endif ')],
			['{* elif ','{* elif ',c0('\\{\\* elif '),c3('\\{\\* elif ')],
			['{* elif ','{* else ',c0('\\{\\* elif '),c3('\\{\\* else ')],

			['{{','}}',					c0('\\{\\{'),c0('\\}\\}')],
			['{*','*}',					c0('\\{\\*'),c0('\\*\\}')],
			['{!!','!!}',				c0('\\{\\!\\!'),c0('\\!\\!\\}')],
			['(',')',					c1('\\('),c3('\\)')],
			['{','}',					c1('\\{'),c3('\\}')],
			['[',']',					c1('\\['),c3('\\]')],
			['SE','FIM_SE',				c0('SE'),c0('FIM_SE')],
			['SE','SENÃO',				c0('SE'),c0('SENÃO')],
			['SE','SENÃO_SE',			c0('SE'),c0('SENÃO_SE')],
			['SENÃO_SE','SENÃO_SE',		c0('SENÃO_SE'),c0('SENÃO_SE')],
			['SENÃO_SE','FIM_SE',		c0('SENÃO_SE'),c0('FIM_SE')],
			['SENÃO_SE','SENÃO',		c0('SENÃO_SE'),c0('SENÃO')],
			['SENÃO','FIM_SE',			c0('SENÃO'),c0('FIM_SE')],
			['REPITA','ATÉ',			c0('REPITA'),c0('ATÉ')],
			['REPITA','ENQUANTO',		c0('REPITA'),c0('ENQUANTO')],
			['REPITA','CONTINUE',		c0('REPITA'),c0('CONTINUE')],
			['ITERE','PRÓXIMO',			c0('ITERE'),c0('PRÓXIMO')],
			['ITERE_CADA','PRÓXIMO',	c0('ITERE_CADA'),c0('PRÓXIMO')],
		]

	}

	//From https://stackoverflow.com/a/6969486
	escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}

	/*
		return <statement> if line close statement otherwise null
	*/
	check_closing(line){
		var result = null;
		if(this.level.length>0){
			this.statements.forEach(statement => {
				var current_level = this.level[this.level.length - 1].statement;
				const pattern = new RegExp(`${statement[3]}`,'gi');
				const groups = pattern.exec(line);
				if (groups !== null){
					if((current_level.toLowerCase() == statement[0].toLowerCase()) && (groups.length) && (groups[1].toLowerCase() == statement[1].toLowerCase())){
						result = statement[1];
					}
				}
			});
		}
		return result;
	}

	/*
		return <statement> if line open statement otherwise null
	*/
	check_opening(line){
		var result = null;
		this.statements.forEach(statement => {
			const pattern = new RegExp(`${statement[2]}`,'gi');
			const groups = pattern.exec(line);
			if (groups !== null){
				if((groups.length) && (groups[1].toLowerCase() == statement[0].toLowerCase())){
					result = statement[0];
				}
			}
		});
		return result;
	}


	/*
		Itera a linha L
      
		Se a linha L corresponde ao fechamento no nível atual
		sim: feche o nível atual (diminui o recuo)
		Aplique recuo à linha correspondente ao nível atual
		Se a linha L corresponde à abertura de um nível
		sim: abra um nível (aumenta o recuo)

		Adicione a linha ao buffer
	
	*/
	indent(space='\t'){
		var indented_lines = []

		for (var index = 0; index < this.lines.length; index++) {

			var line = this.lines[index];


			line = line.replace(/\{\{([^ ])/, (group0, group1, group2) => {
				return `{{ ${group1}`
			})

			line = line.replace(/\{\*([^ ])/, (group0, group1, group2) => {
				return `{* ${group1}`
			})


			var checking = this.check_closing(line);
			if(checking !== null){
				this.level.pop();
				this.indentation -= 1;
			}

			var indented_line = `${space.repeat(this.indentation)}${line.jstrip()}`;

			checking = this.check_opening(line);
			if(checking !== null){
				this.level.push({statement: checking, index: index});
				this.indentation += 1;
			}

			indented_lines.push(indented_line);
		}

		indented_lines = indented_lines.map(i => {
			if(i){
				return `${i}`;
			}
		})

		return indented_lines.join('\n');

	}

}
export default Indenter;
if(typeof(String.prototype.jstrip) === "undefined")
{
    String.prototype.jstrip = function() 
    {
        return String(this).replace(/^[\s\n\t\r]+|[\s\n\t\r]+$/g, '');
    };
}

class Indenter {

	constructor(lines) {

		this.lines = lines;
		this.level = [];
		this.indentation = 0;
		this.statements = [
			['IF','ELSEIF'],
			['IF','ELSE'],
			['IF','ENDIF'],
			['ELSEIF','ELSEIF'],
			['ELSEIF','ENDIF'],
			['ELSEIF','ELSE'],
			['ELSE','ENDIF'],
			['IFMATCHES','ELSE'],
			['IFMATCHES','ENDIF'],
			['IFMATCHES','ELSEIF'],
			['IFBEGINSWITH','ELSE'],
			['IFBEGINSWITH','ENDIF'],
			['IFBEGINSWITH','ELSEIF'],
			['IFENDSWITH','ELSE'],
			['IFENDSWITH','ENDIF'],
			['IFENDSWITH','ELSEIF'],
			['IFCONTAINS','ELSE'],
			['IFCONTAINS','ENDIF'],
			['IFCONTAINS','ELSEIF'],
			['FOR','NEXT'],
			['FOREACH','NEXT'],
			['DO','UNTIL'],
			['DO','WHILE'],
			['DO','LOOP'],
			['UNSAFE','ENDUNSAFE']
		]

	}

	/*
		return <statement> if line close statement otherwise null
	*/
	check_closing(line){
		const result = null;
		if(this.level.length>0){
			this.statements.forEach(statement => {
				const current_level = this.level[this.level.length - 1].statement;
					
			})
		}
		return result;
	}

	/*
		return <statement> if line open statement otherwise null
	*/
	check_opening(line){

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
	indent(){
		const indented_lines = []

		for (var index = 0; index < this.lines.length; index++) {
			const line = this.lines[index];

			const checking = this.check_closing(line);
			if(checking !== null){
				this.level.top();
				this.indentation -= 1;
			}

			indented_line = `${' ' * 2 * this.indentation}${line.jstrip()}`;

			checking = this.check_opening(line);
			if(checking !== null){
				this.level.push({statement: checking, index: index});
				this.indentation += 1;
			}

			indented_lines.push(indented_line);
		}

		indented_lines = indented_lines.map(i => {
			if(i){
				return `${i};`;
			}
		})

		return indented_lines.join('\n');

	}


}
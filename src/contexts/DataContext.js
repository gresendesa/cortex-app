import React, { createContext, Component } from 'react';
import Server from '../server';

export const DataContext = createContext();

class DataContextProvider extends Component {
	
	state = {
		'macros': [],
		'token': null,
		'username': null,
		'processing': false,
		'isUserSuper': false,
		'totalRecords': 0
	}

	version = {
		'number': '1.15',
		'release_date': '12 March 2021',
		'short': 'Public templates importing button added ♥'
	}

	setToken = (token) => {

		if ((token == 'null') || (token == null)){
			localStorage.removeItem('cortex-token');
			this.setState({'token': null});
		} else {
			localStorage.setItem('cortex-token', token);
			this.setState({'token': token}, () => this.fetchMacros({}));
		}	
	}

	setUsername = (username) => {
		if ((username == 'null') || (username == null)){
			localStorage.removeItem('cortex-username');
			this.setState({'username': null});
		} else {
			localStorage.setItem('cortex-username', username);
			this.setState({'username': username});
		}
	}

	setIsUserSuper = (isSuper) => {
		if ((isSuper == 'null') || (isSuper == null)){
			localStorage.removeItem('cortex-is-user-super');
			this.setState({'isUserSuper': false});
		} else {
			localStorage.setItem('cortex-is-user-super', isSuper);
			this.setState({'isUserSuper': isSuper});
		}
	}

	fetchMacros = ({ limit=10, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			this.setState({'processing': true});
			const onOk = (response) => {
				this.setState({'macros': response.projects, 'totalRecords': response.total_records});
				success(response);
				this.setIsUserSuper(response.super);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getMacros({ success:onOk, error, limit })
		} else {
			error("sem token");
		}
	}

	addMacro = ({ macro, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				this.fetchMacros({});
				success(response);
			}
			server.createMacro({ macro, success:onOk, error })
		} else {
			error("sem token");
		}
	}

	getMacro = ({ id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				//remove a versão antiga da macro
				var macros = this.state.macros.map(m => {
					//console.log('update', `${m.id} !== ${id}`, String(m.id) !== String(id))
					if(String(m.id) !== String(id)){
						return m
					}
					return response.project
				})
				//atualiza com a nova versão do servidor
				//macros.unshift(response.project)
				this.setState({'macros': macros}, () => {
					success(response);
					this.setState({'processing': false});
				})
			}
			server.getMacro({ id,success:onOk, error })
		} else {
			error("sem token");
		}
	}

	delMacro = ({ id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				this.fetchMacros({});
				success(response);
			}
			server.deleteMacro({ id, success:onOk, error })
		} else {
			error("sem token");
		}
	}

	saveMacro = ({ id, macro, launch=false, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				//this.fetchMacros({});
				const sucss = (res) => {
					
				}
				const err = () => {
					
				}	
				this.getMacro({ id, sucss, err })
				success(response);
			}

			var current_proj = null
			var macros = this.state.macros.filter(m => {
				if(String(m.id) !== String(id)){
					return true
				}
				current_proj = m
			})
			current_proj.macro = macro
			macros.unshift(current_proj)
			this.setState({'macros': macros})

			server.updateMacro({ id, macro, launch, success:onOk, error })
		} else {
			error("sem token");
		}
	}

	getTask = ({ dev, project, task, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTask({ dev, project, task, success:onOk, error:onIssue })
		} else {
			error("sem token");
		}
	}

	getTasks = ({ dev, project, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTasks({ dev, project, success:onOk, error:onIssue })
		} else {
			error("sem token");
		}
	}

	getBuild = ({ id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.getBuild({ id, success, error })
		} else {
			error("sem token");
		}
	}

	getActionCode = ({ id, name, project_id, task_name, section, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.getTriggerBuild({ id, name, project_id, task_name, section, success, error })
		} else {
			error("sem token");
		}
	}

	getTemplateInfo = ({ library, name, project_id=null, success=()=>{}, error=()=>{} }) => {

		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTemplateInfo({ library, name, project_id, success: onOk, error: onIssue })
		} else {
			error("sem token");
		}
	}

	getTemplates = ({ success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTemplates({ success: onOk, error: onIssue })
		} else {
			error("sem token");
		}
	}

	getPublicTemplates = ({ success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getPublicTemplates({ success: onOk, error: onIssue })
		} else {
			error("sem token");
		}
	}

	getDoc = ({ source, type, target, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getDoc({ source, type, target, success: onOk, error: onIssue })
		} else {
			error("sem token");
		}
	}

	saveTemplates = ({ templates, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.saveTemplates({ templates, success, error })
		} else {
			error("sem token");
		}
	}

	addCollaborator = ({ project_id, username, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.addCollaborator({ project_id, username, success, error })
		} else {
			error("sem token");
		}
	}

	removeCollaborator = ({ project_id, username, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.removeCollaborator({ project_id, username, success, error })
		} else {
			error("sem token");
		}
	}

	getCollaborators = ({ project_id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.getCollaborators({ project_id, success, error })
		} else {
			error("sem token");
		}
	}

	componentWillMount(){
		this.setToken(localStorage.getItem('cortex-token'));
		this.setUsername(localStorage.getItem('cortex-username'));	
		//this.setIsUserSuper(localStorage.getItem('cortex-is-user-super'));
	}

	render() {
		return (
			<DataContext.Provider value={{
											...this.state, 
											setToken: this.setToken,
											setUsername: this.setUsername,
											isUserSuper: this.state.isUserSuper,
											fetchMacros: this.fetchMacros,
											getMacro: this.getMacro,
											addMacro: this.addMacro,
											delMacro: this.delMacro,
											saveMacro: this.saveMacro,
											getTask: this.getTask,
											getTasks: this.getTasks,
											processing: this.state.processing,
											getTemplateInfo: this.getTemplateInfo,
											getPublicTemplates: this.getPublicTemplates,
											getDoc: this.getDoc,
											getBuild: this.getBuild,
											getActionCode: this.getActionCode,
											getTemplates: this.getTemplates,
											saveTemplates: this.saveTemplates,
											setIsUserSuper: this.setIsUserSuper,
											version: this.version,
											addCollaborator: this.addCollaborator,
											removeCollaborator: this.removeCollaborator,
											getCollaborators: this.getCollaborators

										}}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
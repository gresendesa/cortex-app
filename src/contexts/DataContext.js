import React, { createContext, Component } from 'react';
import Server from '../server';

export const DataContext = createContext();

class DataContextProvider extends Component {
	
	state = {
		'macros': [],
		'token': null,
		'username': null,
		'processing': false,
		'isUserSuper': false
	}

	version = {
		'number': '1.5',
		'release_date': '22 July 2020',
		'short': 'Local autocompletion added'
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
			this.setState({'isUserSuper': null});
		} else {
			localStorage.setItem('cortex-is-user-super', isSuper);
			this.setState({'isUserSuper': isSuper});
		}
	}

	fetchMacros = ({ success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			this.setState({'processing': true});
			const onOk = (response) => {
				this.setState({'macros': response.projects});
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getMacros({ success:onOk, error })
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
				this.fetchMacros({});
				success(response);
			}
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

	saveTemplates = ({ templates, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.saveTemplates({ templates, success, error })
		} else {
			error("sem token");
		}
	}

	componentWillMount(){
		this.setToken(localStorage.getItem('cortex-token'));
		this.setUsername(localStorage.getItem('cortex-username'));	
		this.setIsUserSuper(localStorage.getItem('cortex-is-user-super'));
	}

	render() {

		return (
			<DataContext.Provider value={{
											...this.state, 
											setToken: this.setToken,
											setUsername: this.setUsername,
											isUserSuper: this.state.isUserSuper,
											fetchMacros: this.fetchMacros,
											addMacro: this.addMacro,
											delMacro: this.delMacro,
											saveMacro: this.saveMacro,
											getTask: this.getTask,
											getTasks: this.getTasks,
											processing: this.state.processing,
											getBuild: this.getBuild,
											getActionCode: this.getActionCode,
											getTemplates: this.getTemplates,
											saveTemplates: this.saveTemplates,
											setIsUserSuper: this.setIsUserSuper,
											version: this.version

										}}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
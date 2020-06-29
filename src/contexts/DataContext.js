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

	getBuild = ({ id, success=()=>{}, error=()=>{} }) => {
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
			server.getBuild({ id, success: onOk, error: onIssue })
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

		const token = localStorage.getItem('cortex-token');
		this.setToken(token);
		const username = localStorage.getItem('cortex-username');
		this.setUsername(username);	
		const isSuper = localStorage.getItem('cortex-super');
		this.setIsUserSuper(isSuper);	

	}

	render() {

		return (
			<DataContext.Provider value={{
											...this.state, 
											setToken: this.setToken,
											setUsername: this.setUsername,
											isUserSuper: this.isUserSuper,
											fetchMacros: this.fetchMacros,
											addMacro: this.addMacro,
											delMacro: this.delMacro,
											saveMacro: this.saveMacro,
											getTask: this.getTask,
											processing: this.state.processing,
											getBuild: this.getBuild,
											getTemplates: this.getTemplates,
											saveTemplates: this.saveTemplates

										}}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
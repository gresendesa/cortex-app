import React, { createContext, Component } from 'react';
import Server from '../server';

export const DataContext = createContext();

class DataContextProvider extends Component {
	
	state = {
		'macros': [],
		'token': null,
	}

	setToken = (token) => {

		if ((token == 'null') || (token == null)){
			localStorage.removeItem('cortex-token');
			this.setState({'token': null});
		} else {
			localStorage.setItem('cortex-token', token);
			this.setState({'token': token});

		}	
	}

	setMacros = (macros) => {
		this.setState({'macros': macros});
	}

	fetchMacros = () => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const success = (response) => {
				console.log(response.projects);
				this.setMacros(response.projects);
			}
			const error = (response) => {
				console.log(response);
			}
			const macros = server.getMacros({ success, error })
		}
	}

	componentWillMount(){

		const token = localStorage.getItem('cortex-token');
		this.setToken(token);		

	}

	render() {

		return (
			<DataContext.Provider value={
				{...this.state, 
					setToken: this.setToken, 
					fetchMacros: this.fetchMacros
				}
			}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
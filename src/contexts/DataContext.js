import React, { createContext, Component } from 'react';

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

	componentWillMount(){

		let token = localStorage.getItem('cortex-token');
		this.setToken(token);

	}

	render() {

		return (
			<DataContext.Provider value={{...this.state, 'setToken': this.setToken}}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
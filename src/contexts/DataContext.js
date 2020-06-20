import React, { createContext, Component } from 'react';

export const DataContext = createContext();

class DataContextProvider extends Component {
	
	state = {
		'macros': [],
		'token': null,
		'server': 'http://localhost:8000/'
	}

	setToken = (token) => {
		this.setState({'token': token});
	}

	setMacros = (macros) => {
		this.setState({'macros': macros});
	}

	render() {

		return (
			<DataContext.Provider value={{...this.state}}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
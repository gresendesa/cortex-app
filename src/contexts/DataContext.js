import React, { createContext, Component } from 'react';
import { foo } from '../mock/processes';

export const DataContext = createContext();

class DataContextProvider extends Component {
	state = {
		...foo
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
import React from 'react';
import Routes from './routes';
import DataContextProvider from './contexts/DataContext';
import { DataContext } from './contexts/DataContext';

class App extends React.Component {

	render(){
		return (
			<DataContextProvider>
			
				<Routes/>	
				
			</DataContextProvider>
		);
	};
}

export default App;

import React from 'react';
import Routes from './routes'
import DataContextProvider from './contexts/DataContext'

function App() {
	return (
		<DataContextProvider>
			<Routes />	
		</DataContextProvider>
	);
}

export default App;

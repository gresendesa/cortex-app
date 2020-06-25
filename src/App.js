import React from 'react';
import Routes from './routes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DataContextProvider from './contexts/DataContext';
import { DataContext } from './contexts/DataContext';

class App extends React.Component {

	render(){

		const theme = createMuiTheme({
			typography: {
				fontSize: 21,
			},
		});

		return (
			<DataContextProvider>
				<ThemeProvider theme={theme}>
					<Routes />	
				</ThemeProvider>
			</DataContextProvider>
		);
	};
}

export default App;

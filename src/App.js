import React from 'react';
import Routes from './routes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: 20,
  },
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes />	
		</ThemeProvider>
	);
}

export default App;

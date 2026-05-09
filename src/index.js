import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
	typography: {
		fontSize: 21,
	},
	palette: {
		type: 'dark',
	},
});

ReactDOM.render(
  <React.StrictMode>
  	<ThemeProvider theme={theme}>
    	<App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

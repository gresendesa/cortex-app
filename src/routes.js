import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Macro from './Macro';
import Projects from './Projects';
import Login from './components/Login';
import Footer from './uis/Footer';
import { DataContext } from './contexts/DataContext';

export default function Routes({ context }) {

	return(
		
		<DataContext.Consumer>{(context) => {

			return(
				<Router history={history}>
					<ButtonAppBar logged={context.token !== null} setToken={context.setToken} />
					<Container maxWidth="sm">
						{
							context.token !== null ?
							<Switch>
								<Route exact path="/macro" component={Macro} />
								<Route render={(props) => (
									<Projects {...props} fetchMacros={context.fetchMacros} macros={context.macros} /> 
								)} />
							</Switch>
							:
							<Route 
								render={(props) => (
									<Login {...props} setToken={context.setToken} /> 
								)} />
						}
						
					</Container>
					<Footer />
				</Router>
			)
		}}
		</DataContext.Consumer>
		
		
	);
}
//<BottomBar />
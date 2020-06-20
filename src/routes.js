import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Macro from './Macro';
import Projects from './Projects';
import Login from './components/Login';
import Footer from './uis/Footer';
import { DataContext } from './contexts/DataContext';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Routes({ context }) {

	return(
		
		<DataContext.Consumer>{(context) => {

			return(
				<Router history={history}>
					<ButtonAppBar logged={context.token !== null} setToken={context.setToken} />
					<Container maxWidth="sm">

						{context.processing && <LinearProgress color="secondary" />}
						{
							context.token !== null ?
							<Switch>
								<Route path="/project/:id" render={(props) => {

									//const macro = context.macros.some
									const project = context.macros.find(m => m.id == props.match.params.id)
							
									return (
										project ?
										<Macro {...props} project={project} saveMacro={context.saveMacro} />
										:''
									)

									}}
								/>
								<Route render={(props) => (
									<Projects {...props} 
										fetchMacros={context.fetchMacros} 
										addMacro={context.addMacro} 
										delMacro={context.delMacro}
										macros={context.macros} 
									/> 
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
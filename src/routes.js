import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Macro from './Macro';
import Projects from './Projects';
import Templates from './Templates';
import Login from './components/Login';
import Footer from './uis/Footer';
import TemplateForm from './uis/TemplateForm';
import { DataContext } from './contexts/DataContext';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Routes({ context }) {

	return(
		
		<DataContext.Consumer>{(context) => {

			return(
				<Router history={history}>
					<ButtonAppBar logged={context.token !== null} setToken={context.setToken} username={context.username} />
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
										<Macro {...props} 
											project={project} 
											saveMacro={context.saveMacro} 
											getTask={context.getTask} 
											getTasks={context.getTasks} 
											getBuild={context.getBuild} 
											isUserSuper={context.isUserSuper} 
											getActionCode={context.getActionCode} />
										:''
									)

									}}
								/>

								<Route exact path="/libs" render={(props) => (
									<Templates {...props} 
										getTemplates={context.getTemplates} 
										saveTemplates={context.saveTemplates} 
										component={Templates}
									/>
								)} />
								<Route render={(props) => (
									<Projects {...props} 
										fetchMacros={context.fetchMacros} 
										addMacro={context.addMacro} 
										delMacro={context.delMacro}
										macros={context.macros} 
										isUserSuper={context.isUserSuper} 
									/> 
								)} />
							</Switch>
							:
							<Switch>
								<Route exact path="/editor" component={TemplateForm} />
								<Route 
									render={(props) => (
										<Login {...props} setToken={context.setToken} setUsername={context.setUsername} setIsUserSuper={context.setIsUserSuper} /> 
									)} />
							</Switch>
								
						}
						
					</Container>
					<Footer version={context.version} />
				</Router>
			)
		}}
		</DataContext.Consumer>
		
		
	);
}
//<BottomBar />
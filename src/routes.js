import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Macro from './Macro';

import Loader from './Loader';

import Projects from './Projects';
import Templates from './Templates';
import Login from './components/Login';
import PlainMacro from './PlainMacro';
import Footer from './uis/Footer';
import TemplateForm from './uis/TemplateForm';
import { DataContext } from './contexts/DataContext';
import LinearProgress from '@material-ui/core/LinearProgress';

import brace from 'brace';
import AceEditor from 'react-ace';
import MacroModHighlight from './acemode/MacroMod.js'

import 'brace/theme/github';

export default function Routes({ context }) {

	const editorMode = new MacroModHighlight();

	return(

		<DataContext.Consumer>{(context) => {

			return(
				<Router history={history}>
					<ButtonAppBar logged={context.token !== null} setToken={context.setToken} username={context.username} version={context.version} />
					<Container maxWidth="sm">

						{context.processing && <LinearProgress color="secondary" />}
						{
							context.token !== null ?
							<Switch>

								<Route path="/project/flat/:id" render={(props) => {
									//const macro = context.macros.some
									const project = context.macros.find(m => m.id == props.match.params.id)


									return (


										(project) ? (
											((project.macro) && (project.macro.type)) ?
											<PlainMacro {...props} 
												project={project} 
												saveMacro={context.saveMacro} 
												getBuild={context.getBuild}
												getTemplateInfo={context.getTemplateInfo}
												getPublicTemplates={context.getPublicTemplates}
												editorMode={editorMode} 
												getDoc={context.getDoc}
												addCollaborator={context.addCollaborator}
												removeCollaborator={context.removeCollaborator}
											/>
											 :
											 <Loader {...props} 
												getMacro={context.getMacro}
											/>
										)
										:''
									
									)
								}} />

								<Route path="/project/:id" render={(props) => {

									//const macro = context.macros.some
									const project = context.macros.find(m => m.id == props.match.params.id)

									return (
										(project) ? (
											((project.macro) && (project.macro.tasks)) ?
											<Macro {...props} 
												project={project} 
												saveMacro={context.saveMacro} 
												getTask={context.getTask} 
												getTasks={context.getTasks} 
												getBuild={context.getBuild} 
												isUserSuper={context.isUserSuper} 
												getActionCode={context.getActionCode}
												getTemplateInfo={context.getTemplateInfo}
												getDoc={context.getDoc}
												editorMode={editorMode}
												addCollaborator={context.addCollaborator}
												removeCollaborator={context.removeCollaborator}
												getPublicTemplates={context.getPublicTemplates}
											 />
											 :
											 <Loader {...props} 
												getMacro={context.getMacro}
											/>
										)
										:''
									)

									}}
								/>

								<Route exact path="/libs" render={(props) => (
									<Templates {...props} 
										getTemplates={context.getTemplates} 
										saveTemplates={context.saveTemplates} 
										component={Templates}
										getTemplateInfo={context.getTemplateInfo}
										getPublicTemplates={context.getPublicTemplates}
										getDoc={context.getDoc}
										editorMode={editorMode}
									/>
								)} />

								<Route render={(props) => (
									<Projects {...props} 
										addMacro={context.addMacro} 
										delMacro={context.delMacro}
										macros={context.macros} 
										fetchMacros={context.fetchMacros}
										totalRecords={context.totalRecords} 
										isUserSuper={context.isUserSuper} 
										setIsUserSuper={context.setIsUserSuper}
										username={context.username}
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
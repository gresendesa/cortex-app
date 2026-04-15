import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import ButtonAppBar from './components/NavBar';
import Login from './components/Login';
import PublicEditor from './PublicEditor';
import WorkbenchShell from './components/WorkbenchShell';
import CSKeyGenerator from './uis/CSKeyGenerator';
import { DataContext } from './contexts/DataContext';
import LinearProgress from '@material-ui/core/LinearProgress';

import MacroModHighlight from './acemode/MacroMod.js'

import 'brace/theme/github';
import { plainMacroModel } from './mock/models';

export default function Routes({ context }) {

	const editorMode = new MacroModHighlight();

	return(

		<DataContext.Consumer>{(context) => {

			return(
				<Router history={history}>
					<ButtonAppBar logged={context.token !== null} setToken={context.setToken} username={context.username} version={context.version} />
					{context.processing && <LinearProgress color="secondary" />}
					{
						context.token !== null ?
						<WorkbenchShell context={context} editorMode={editorMode} />
						:
							<Switch>
								<Route 
									exact path="/cskey" 
									render={(props) => {
										document.title = `Rocket`
										return (<CSKeyGenerator {...props} setToken={context.setToken} setUsername={context.setUsername} setIsUserSuper={context.setIsUserSuper} /> )
									}} />
								<Route 
									exact path="/login" 
									render={(props) => {
										document.title = `Rocket`
										return (<Login {...props} setToken={context.setToken} setUsername={context.setUsername} setIsUserSuper={context.setIsUserSuper} /> )
									}} />
								<Route 
									render={(props) => {
										//const macro = context.macros.some
										var project = JSON.parse(localStorage.getItem('localMacro'));
										if(project === null){
											project = {
												id: 'mymacro',
												macro: plainMacroModel({ name: 'mymacro', csid: 'NA', description: 'this is a local macro' })
											}
										}
										//component={PublicEditor}
	
										return (

											<PublicEditor {...props} 
												project={project} 
												saveMacro={context.saveLocalMacro} 
												getBuild={context.buildLocalCode}
												getTemplateInfo={context.getTemplateInfo}
												getPublicTemplates={context.getPublicTemplates}
												editorMode={editorMode} 
												getDoc={context.getDoc}
												//addCollaborator={context.addCollaborator}
												//removeCollaborator={context.removeCollaborator}
											/>
										
										)
									}}
									
								/>
							</Switch>
								
						}
					
				</Router>
			)
		}}
		</DataContext.Consumer>
		
		
	);
}
//<BottomBar />
import React from 'react';
import TaskList from './components/TaskList';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import { foo } from './mock/processes'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TriggerEditor from './Trigger'

function App() {

	var tasks = foo.macro.tasks;

	return (


		<React.Fragment>

			<ButtonAppBar />
			<Container maxWidth="sm">

				<Router>
					
					<Route exact path="/">

					  	<h2>Process <small>{ foo.name }</small> </h2>
					    <TaskList tasks={tasks} />
						
					</Route>

					<Route exact path="/trigger">

					  	<h2>Trigger </h2>
					    <TriggerEditor />
						
					</Route>

				</Router>

			</Container>

		</React.Fragment>
		
	);
}

export default App;

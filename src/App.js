import React from 'react';
import TaskList from './components/TaskList';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import { foo } from './mock/processes'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {

	var tasks = foo.macro.tasks;

	return (
		
		<Router>
			
			<Route exact path="/">

				<React.Fragment>

				  	<ButtonAppBar />

				  	<Container maxWidth="sm">

				  		<h2>Process <small>{ foo.name }</small> </h2>

				      	<TaskList tasks={tasks} />

				  	</Container>

				</React.Fragment>
			</Route>

		</Router>
			
		

	);
}

export default App;

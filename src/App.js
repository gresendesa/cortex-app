import React from 'react';
import TaskList from './components/TaskList';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import { foo } from './mock/processes'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Trigger from './containers/Trigger'
import Process from './containers/Process'

function App() {

	var tasks = foo.tasks;

	var process = new Process(foo);

	return (


		<React.Fragment>

			<ButtonAppBar />
			<Container maxWidth="sm">

				<Router>
					
					<Route exact path="/">

					  	<h2>Process <small>{ foo.name }</small> </h2>
					    <TaskList tasks={tasks} />
						
					</Route>

					<Route path="/trigger/">

					  	<h2>Trigger </h2>
					    <Trigger />
						
					</Route>

				</Router>

			</Container>

		</React.Fragment>
		
	);
}

export default App;

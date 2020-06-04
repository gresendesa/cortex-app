import React from 'react';
import TaskList from './components/TaskList';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import { foo } from './mock/processes'

function App() {

	var tasks = foo.macro.tasks;

	return (

		<React.Fragment>

		  	<ButtonAppBar />

		  	<Container maxWidth="sm">

		  		<h2>Process <small>{ foo.name }</small> </h2>

		      	<TaskList tasks={tasks} />

		  	</Container>

		</React.Fragment>

	);
}

export default App;

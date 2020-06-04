import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Trigger from './containers/Trigger'
import Process from './containers/Process'

export default function Routes() {
	return(
		<Router>
			<ButtonAppBar />
			<Container maxWidth="sm">
				
				<Route exact path="/" component={Process} />
				<Route path="/trigger/" component={Trigger} />
				
			</Container>
		</Router>
	);
}
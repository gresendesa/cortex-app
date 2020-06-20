import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import TaskList from './components/TaskList';
import BottomBar from './components/BottomBar';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Macro from './Macro';
import Login from './components/Login';
import Footer from './uis/Footer';

export default function Routes() {
	return(
		<Router history={history}>
 			<ButtonAppBar />
			<Container maxWidth="sm">
				<Route exact path="/" component={Macro} />
				<Route exact path="/login" component={Login} />
			</Container>
			<Footer />
		</Router>
	);
}
//<BottomBar />
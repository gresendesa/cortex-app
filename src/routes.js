import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import ButtonAppBar from './components/NavBar';
import { Container } from '@material-ui/core';
import Macro from './Macro';
import Projects from './Projects';
import Login from './components/Login';
import Footer from './uis/Footer';

export default function Routes() {
	return(
		<Router history={history}>
 			<ButtonAppBar />
			<Container maxWidth="sm">
				<Route exact path="/" component={Macro} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/projects" component={Projects} />
			</Container>
			<Footer />
		</Router>
	);
}
//<BottomBar />
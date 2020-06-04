import React from 'react';
import Task from './Task';
import TaskList from '../components/TaskList';
import { foo } from '../mock/processes';


class Process extends React.Component {

	constructor(){
		super();
		var proc = foo;
		console.log(proc);
		this.state = {
			'name': proc.name,
			'description': proc.description,
			'debug': proc.debug,
			'production': proc.production,
			'inner_protocol': proc.inner_protocol,
			'protocol': proc.protocol,
			'pname': proc.pname,
			'entrypoint': proc.entrypoint,
			'unsafe': proc.unsafe,
			'tasks': proc.tasks
		};
	}

	render(){

		return (
			<React.Fragment>
				<h2>Process <small>{this.state.name}</small> </h2>
				<TaskList tasks={this.state.tasks} />
			</React.Fragment>
		)

	}

}

export default Process;
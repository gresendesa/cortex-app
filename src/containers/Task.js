import React from 'react';
import { Task as TaskUI } from '../components/Task';


class Task extends React.Component {


	constructor({ task }){
		super();
		this.task = task;
		console.log(task);
	}

	render(){

		return (
			<Task task={this.task} />
		);

	}

}

export default Task;
import React from 'react';
import TaskPackage from './TaskPackage'

class Process extends React.Component {

	constructor(props){
		super();
		this.state = {
			'name': props.name,
			'description': props.description,
			'debug': props.debug,
			'production': props.production,
			'inner_protocol': props.inner_protocol,
			'protocol': props.protocol,
			'pname': props.pname,
			'entrypoint': props.entrypoint,
			'unsafe': props.unsafe,
			'tasks': new TaskPackage(props.tasks)
		};
	}

	render(){

		return (

			<div>
				<h3>opa</h3>
			</div>

		)

	}

}

export default Process;
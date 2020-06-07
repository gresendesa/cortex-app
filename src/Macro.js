import React, { useState } from 'react';
import TaskPanel from './uis/TaskPanel';
import TasksSection from './uis/TasksSection';
import TaskCreateDialog from './uis/TaskCreateDialog';
import { DataContext } from './contexts/DataContext';
import { Typography, Box, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { foo } from './mock/processes';
import Snackbar from '@material-ui/core/Snackbar';

class Macro extends React.Component {

	state = {
		...foo,
		'openDialog': false
	}

	constructor(){
		super();
	}

	deleteTask = (id) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id !== id;
		});
		this.setState({'tasks':tasks});
	}

	pushTask = (task) => {
		this.setState({'tasks': [...this.state.tasks, task]})
	}

	hasTask = (task) => {
		return (this.state.tasks.some(e => e.name == task.name) || this.state.tasks.some(e => e.id == task.id))
	}

	deleteTask = (id) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id !== id;
		});
		this.setState({'tasks':tasks});
	}

	hookNewTask = () => {
		return [ 
			this.state.openDialog, //open flag
			() => { this.setState({'openDialog': !this.state.openDialog }); }, //toggleDialog
			(task) => { this.pushTask(task) },
			(task) => { this.hasTask(task) },
			(id) => { this.deleteTask(id) }	
		]
	}

	render(){

		var [open, toogleDialog, pushTask, hasTask, deleteTask] = this.hookNewTask();

		return (

			<React.Fragment>

				<Grid container
				  direction="row"
				  justify="space-between"
				  alignItems="center">
					
					<Grid item>
						<Box component="span" m={1}>
							<Typography variant="h5">Tasks 
								<Typography color="textSecondary"> Macro {this.state.name}</Typography> 
							</Typography>
						</Box>
					</Grid>

					<Grid item>
						<Box component="span" m={1}>
							<Typography>
								<IconButton aria-label="add task" onClick={toogleDialog}>
									<AddIcon />
								</IconButton>
							</Typography>
						</Box>

						<TaskCreateDialog hookNewTask={this.hookNewTask}/>

					</Grid>

				</Grid>

				<TasksSection tasks={this.state.tasks} deleteTask={deleteTask} />

			</React.Fragment>

		);

	}

}

export default Macro;
import React, { useState } from 'react';
import TasksSection from './uis/TasksSection';
import TaskCreateDialog from './uis/TaskCreateDialog';
import TaskEditDialog from './uis/TaskEditDialog';
import { DataContext } from './contexts/DataContext';
import { Typography, Box, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { foo } from './mock/processes';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

class Macro extends React.Component {

	state = {
		...foo,
		'openCreateDialog': false,
		'popUpAlert': false,
		'alertMessage': '',
		'focus': {'task':null, 'group':null, 'trigger':null}
	}

	constructor(){
		super();
		this.listRef = React.createRef();
		this.pageYOffset = null;
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		this.pageYOffset = window.pageYOffset;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		window.pageYOffset = this.pageYOffset;
		window.scrollBy(0, this.pageYOffset);
	}

	deleteTask = (id) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id !== id;
		});
		this.setState({'tasks':tasks});
	}

	setFocus = ({ task=null, group=null, trigger=null}) => {
		this.setState({'focus': {task, group, trigger}});
	}

	getFocus = () => {
		return this.state.focus;
	}

	pushTask = (task) => {
		this.setState({'tasks': [...this.state.tasks, task]})
	}

	hasTask = (task, except=false) => {
		if (except) {
			var filtered_tasks = this.state.tasks.filter(t => t.id !== task.id);
			var result = (filtered_tasks.some(e => e.name == task.name) || filtered_tasks.some(e => e.id == task.id))
		} else {
			var result = (this.state.tasks.some(e => e.name == task.name) || this.state.tasks.some(e => e.id == task.id))
		}
		return result;
	}

	deleteTask = (id, callback) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id != id;
		});
		this.setState({'tasks':tasks}, callback);
	}

	editTask = (task) => {

		const copyTasks = Object.assign([], this.state.tasks);
		/*const indice = copyTasks.findIndex(t => {
			return t.id == task.id
		})*/
		const filteredTasks = copyTasks.filter(t => {
			return t.id !== task.id
		})
		const tasks = [task, ...filteredTasks];
		//tasks[indice] = task;
		this.deleteTask(task.id, () => {
			this.setState({tasks})
		});
		
	}

	showAlert = (message) => {
		this.setState({'alertMessage': message}, () => {
			this.setState({'popUpAlert':true});
		});
	}

	hookTask = () => {
		return {
			'open': this.state.openCreateDialog, //open flag
			'popUpAlert': this.state.popUpAlert, //open alert toast
			'focus': this.state.focus,
			'toggleCreateDialog': () => { this.setState({'openCreateDialog': !this.state.openCreateDialog }); }, //toggleDialog
			'toggleEditDialog': () => { this.setState({'openEditDialog': !this.state.openEditDialog }); }, //toggleDialog
			'togglePopUpAlert': () => { this.setState({'popUpAlert': !this.state.popUpAlert }); },
			'pushTask': (task) => { this.pushTask(task) },
			'hasTask': (task, except=false) => { return this.hasTask(task, except) },
			'deleteTask': (id) => { this.deleteTask(id) },
			'editTask': (task) => { this.editTask(task) },
			'alert': (message) => { this.showAlert(message) },
			'setMacroState': (state) => {this.setState(state)},
			'setFocus': this.setFocus,
			'hasFocus': this.hasFocus,
			'getFocus': this.getFocus,
		}
	}

	render(){

		var { open, toggleCreateDialog, togglePopUpAlert, toggleEditDialog, pushTask, hasTask, deleteTask, popUpAlert} = this.hookTask();

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
								<IconButton aria-label="add task" onClick={toggleCreateDialog}>
									<AddIcon />
								</IconButton>
							</Typography>
						</Box>

						<TaskCreateDialog hookTask={this.hookTask}/>

					</Grid>

				</Grid>

				<TasksSection tasks={this.state.tasks} hookTask={this.hookTask} />

				<Snackbar open={popUpAlert} autoHideDuration={2000} onClose={togglePopUpAlert} >
					<MuiAlert elevation={6} variant="filled" severity="warning">
						{this.state.alertMessage}
					</MuiAlert>
				</Snackbar>

			</React.Fragment>

		);

	}

}

export default Macro;
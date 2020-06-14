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
import SettingsIcon from '@material-ui/icons/Settings';
import MacroSettings from './uis/MacroSettings';

class Macro extends React.Component {

	state = {
		...foo,
		'openCreateDialog': false,
		'popUpAlert': false,
		'alertMessage': '',
		'focus': {'task':null, 'group':null, 'trigger':null},
		'openConfig': false,
	}

	constructor(){
		super();
		this.listRef = React.createRef();
		this.pageYOffset = null;
	}

	/*getSnapshotBeforeUpdate(prevProps, prevState) {
		this.pageYOffset = window.pageYOffset;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		window.scrollBy(0, this.pageYOffset);
	}*/

	deleteTask = (id) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id !== id;
		});
		this.setState({'tasks':tasks});
	}

	setFocus = ({ task=null, group=null, trigger=null}) => {
		this.setState({'focus': {task, group, trigger}});
	}

	setOpenConfig = (bool) => { 
		this.setState({'openConfig': bool }); 
	}

	getFocus = () => {
		return this.state.focus;
	}

	handleNameChange = (e) => {
		this.setState({'name': e.target.value});
	}

	handlePNameChange = (e) => {
		this.setState({'pname': e.target.value});
	}

	handleDescriptionChange = (e) => {
		this.setState({'description': e.target.value});
	}

	handleEntrypointChange = (e) => {
		this.setState({'entrypoint': e.target.value});
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

	showAlert = (message, severity) => {
		this.setState({'alertMessage': message, 'alertSeverity': severity}, () => {
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
			'setOpenConfig': (bool) => { this.setOpenConfig(bool) },
			'pushTask': (task) => { this.pushTask(task) },
			'hasTask': (task, except=false) => { return this.hasTask(task, except) },
			'deleteTask': (id) => { this.deleteTask(id) },
			'editTask': (task) => { this.editTask(task) },
			'alert': (message, severity="warning") => { this.showAlert(message, severity) },
			'setMacroState': (state) => {this.setState(state)},
			'setFocus': this.setFocus,
			'hasFocus': this.hasFocus,
			'getFocus': this.getFocus,
		}
	}

	onConfigClose = () => {
		this.setState({'openConfig': false});
	}

	render(){

		var { open, toggleCreateDialog, togglePopUpAlert, toggleEditDialog, pushTask, hasTask, deleteTask, popUpAlert} = this.hookTask();

		const settings = {
			'name': this.state.name,
			'description': this.state.description,
			'pname': this.state.pname,
			'entrypoint': this.state.entrypoint,
		}

		return (

			<React.Fragment>

				<Grid container
				  direction="row"
				  justify="space-between"
				  alignItems="center">
					
					<Grid item>
						<Box component="span" m={1}>
							<Typography color="textSecondary">
								Macro {this.state.name} 
								<IconButton aria-label="add task" onClick={() => {this.setOpenConfig(true)}}>
									<SettingsIcon fontSize="small" />
								</IconButton>
							</Typography> 
							<Typography variant="h5">
								Tasks
							</Typography>
						</Box>
					</Grid>

					<Grid item>
						<Box component="span" m={1}>
							<Typography>
								<IconButton aria-label="add task" onClick={toggleCreateDialog}>
									<AddIcon fontSize="large" />
								</IconButton>
							</Typography>
						</Box>

						<TaskCreateDialog hookTask={this.hookTask}/>

					</Grid>

				</Grid>

				<TasksSection tasks={this.state.tasks} hookTask={this.hookTask} />

				<Snackbar open={popUpAlert} autoHideDuration={2000} onClose={togglePopUpAlert} >
					<MuiAlert elevation={6} variant="filled" severity={this.state.alertSeverity}>
						{this.state.alertMessage}
					</MuiAlert>
				</Snackbar>

				<MacroSettings openConfig={this.state.openConfig} settings={settings} hookTask={this.hookTask} />

			</React.Fragment>

		);

	}

}

export default Macro;
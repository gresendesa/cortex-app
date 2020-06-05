import React, { useState } from 'react';
import TaskPanel from './uis/TaskPanel';
import TasksSection from './uis/TasksSection';
import TaskCreateDialog from './uis/TaskCreateDialog';
import { DataContext } from './contexts/DataContext';
import { Typography, Box, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { foo } from './mock/processes'

class Macro extends React.Component {

	state = {
		...foo,
		'openDialog': false
	}

	constructor(){
		super();
	}

	render(){

		const hookNewTask = () => {
			return [ 
				//open flag
				this.state.openDialog,
				//toggleDialog
				() => { this.setState({'openDialog': !this.state.openDialog }); },
				//pushTask
				(task) => { this.setState({'tasks': [...this.state.tasks, task]}) },
				//hasTask
				(task) => { return ( this.state.tasks.some(e => e.name == task.name) || this.state.tasks.some(e => e.id == task.id) ) }
			]
		}

		//this.setState({'tasks': this.state.tasks.push(task)}

		var [open, toogleDialog, pushTask, hasTask] = hookNewTask();

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

						<TaskCreateDialog hookNewTask={hookNewTask}/>

					</Grid>

				</Grid>

				<TasksSection tasks={this.state.tasks} />

			</React.Fragment>

		);

	}

}

export default Macro;
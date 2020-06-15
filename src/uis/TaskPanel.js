import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TriggersSection from './TriggersSection';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import TaskEditDialog from './TaskEditDialog';
import usePrevious from './utils'

export default function TasksPanel({ task, hookTask, indice }) {

	const { deleteTask, editTask, hasTask, alert, focus, setFocus, getFocus, moveTaskUp } = hookTask();

	var initial_expand = false;
	if((getFocus().task!=null) && (getFocus().task.id==task.id)){
    	initial_expand = true;
  	}

	const [edit, setEdit] = useState(false);
	const [expand, setExpand] = useState(initial_expand);

	const activeEditPanel = () => {
		setEdit(true);
	}

	const handleDeleteClick = () => {
		deleteTask(task.id);
	}

	const handleMoveTaskUp = () => {
		moveTaskUp(task);
	}

	const handleExpandClick = () => {
		if(!expand){
			setFocus({task});
		}
		setExpand(!expand);
	}	

	return (

		<Box>
			<ExpansionPanel expanded={expand} >

				<ExpansionPanelSummary 
					onClick={handleExpandClick}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
					<Typography >
						<strong>{task.name}</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="stretch"
					>
						<Grid item>
							<TriggersSection task={task} hookTask={hookTask} />
						</Grid>
						<Grid item>
							<BottomNavigation >
								{
									indice>0 ?
									<BottomNavigationAction onClick={handleMoveTaskUp} label="Move Up" icon={<ArrowUpwardIcon />} />
									: ""
								}
								<BottomNavigationAction onClick={activeEditPanel} label="Edit" icon={<EditIcon />} />
								<BottomNavigationAction onClick={handleDeleteClick} label="Delete" icon={<DeleteIcon />} />
							</BottomNavigation>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<TaskEditDialog task={task} editTask={editTask} edit={edit} setEdit={setEdit} hasTask={hasTask} alert={alert} />
		</Box>
	);

}

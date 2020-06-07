import React, { useState } from 'react';
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
import TaskEditDialog from './TaskEditDialog';

export default function TaskPanel({ task, hookTask }) {

	var { deleteTask, editTask } = hookTask();

	var [edit, setEdit] = useState(false);

	const activeEditPanel = () => {
		setEdit(true);
	}

	const handleDeleteClick = () => {
		deleteTask(task.id);
	}

	return (
		<Box>
			<ExpansionPanel>

				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
					<Typography >
						<strong>{ task.name }</strong>
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
							<TriggersSection ing={task.triggers.opening} main={task.triggers.main} ending={task.triggers.ending} />
						</Grid>
						<Grid item>
							<BottomNavigation >
								<BottomNavigationAction label="Nearby" value="nearby" icon={<EditIcon onClick={activeEditPanel} />} />
								<BottomNavigationAction label="Folder" value="folder" icon={<DeleteIcon onClick={handleDeleteClick} />} />
							</BottomNavigation>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<TaskEditDialog task={task} editTask={editTask} edit={edit} setEdit={setEdit} />
		</Box>
	);

}

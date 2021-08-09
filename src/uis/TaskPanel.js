import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import DeleteButtonTask from './DeleteButton';

import TaskEditDialog from './TaskEditDialog';
import usePrevious from './utils'

/*

  overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));*/

const useStyles = makeStyles((theme) => ({
  panel: {
  	marginTop: theme.spacing(1),
  }
}));

function TypographyCustom({ color, children }) {
	const useStyles = makeStyles((theme) => ({
	  title: {
	    overflow: 'hidden',
    	textOverflow: 'ellipsis',
    	whiteSpace: 'nowrap',
    	textAlign:'center',
    	maxWidth: '35vw'
	  },
	}));

	const classes = useStyles();

	return (
		<Typography color={color} className={classes.title}>
			{ children }
		</Typography>
	)
}

export default function TasksPanel({ project, disabledTasks, task, hookTask, indice, editorMode }) {

	const classes = useStyles();

	const { deleteTask, editTask, hasTask, alert, focus, setFocus, getFocus, moveTaskUp, hasMacroUnsafe, toggleTaskStatus } = hookTask();

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

	const disableEnableTask = () => {
		toggleTaskStatus(task);
	}

	const [enabled, setEnabled] = useState(((disabledTasks == undefined) || (!disabledTasks.includes(task.name))));

	useEffect(() => {
		setEnabled((disabledTasks == undefined) || (!disabledTasks.includes(task.name)));
	},[disabledTasks])

	return (

		<Box>
			<ExpansionPanel expanded={expand} square={true}>

				<ExpansionPanelSummary 
					onClick={handleExpandClick}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					className={classes.panel}>
					
					{
						enabled ?
							<TypographyCustom>
								<strong>{task.name}</strong>
							</TypographyCustom>
							:
							<TypographyCustom color="textSecondary">
								<strike>{task.name}</strike>
							</TypographyCustom>
					}

				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="stretch"
					>
						<Grid item>
							<TriggersSection project={project} task={task} hookTask={hookTask} editorMode={editorMode} />
						</Grid>
						<Grid item>
							<BottomNavigation >
								{
									indice>0 ?
									<BottomNavigationAction onClick={handleMoveTaskUp} label="Move Up" icon={<ArrowUpwardIcon />} />
									: ""
								}
								<BottomNavigationAction onClick={activeEditPanel} label="Edit" icon={<EditIcon />} />
								
								{
									enabled ?
										<BottomNavigationAction onClick={disableEnableTask} label="Disable task" icon={<BlockIcon />} />
										:
										<BottomNavigationAction onClick={disableEnableTask} label="Enable task" icon={<CheckIcon />} />
								}
								
								<DeleteButtonTask type='task' callback={handleDeleteClick} />
							</BottomNavigation>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<TaskEditDialog task={task} editTask={editTask} edit={edit} setEdit={setEdit} hasTask={hasTask} alert={alert} hasMacroUnsafe={hasMacroUnsafe} />
		</Box>
	);

}

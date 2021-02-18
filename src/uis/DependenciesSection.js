import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import TaskPanel from './TaskPanel';
import uuid from 'uuid';
import ExtensionTwoToneIcon from '@material-ui/icons/ExtensionTwoTone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DependencieInfoDialog from './DependencieInfoDialog';
import DeleteButton from './DeleteButton';


function Dependencie({ dependencie, deleteDependencie, getForeingTask, popUp, alert }){


	const handleClick = () => {

		const success = (response) => {
			popUp({ dependencie, task: response.detail });
		}

		const error = (response) => {
			alert(response);
		}

		getForeingTask({ dev:dependencie.dev, project:dependencie.project, task:dependencie.taskName, success, error })
	}

	return (
		<ListItem dense button onClick={handleClick}>
			<ListItemIcon>
				<ExtensionTwoToneIcon />
			</ListItemIcon>
			<ListItemText primary={
				<Typography color="secondary">
					{dependencie.taskName}
				</Typography>
			} secondary={dependencie.dev + "." + dependencie.project} />
			<ListItemSecondaryAction>
				<DeleteButton type='dependencie' callback={() => {deleteDependencie(dependencie.id)}} />
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default function DependenciesSection({ dependencies, hookTask }) {

	const { deleteDependencie, getForeingTask, alert } = hookTask();
	const [open, setOpen] = useState(false);
	const [dependencieDetails, setDependencieDetails] = useState({});
	const [taskDetails, setTaskDetails] = useState({})

	const popUp = ({ dependencie, task }) => {
		setDependencieDetails(dependencie);
		setTaskDetails(task)
		setOpen(true);
	}

	return (

		<Box>
			{
				dependencies.length>0 ?

				<List dense component="nav" aria-label="main mailbox folders">
					<Divider />

					{
						dependencies.map(d => {
							return (
								<Dependencie dependencie={d} deleteDependencie={deleteDependencie} getForeingTask={getForeingTask} popUp={popUp} alert={alert} key={d.id} />
							)
						})
					}
					<Divider />
				</List>

				: ''
			}

			<DependencieInfoDialog open={open} setOpen={setOpen} dependencie={dependencieDetails} task={taskDetails} />
			
		</Box>

	);
}

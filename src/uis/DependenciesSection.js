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
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DependencieInfoDialog from './DependencieInfoDialog';


function Dependencie({ dependencie, deleteDependencie, getForeingTask, popUp }){


	const handleClick = () => {

		console.log("tey")

		const success = (response) => {
			console.log('ok', response);
			popUp({ dependencie });
		}

		const error = (response) => {
			console.log('erro', response);
		}

		getForeingTask({ dev:dependencie.dev, project:dependencie.project, task:dependencie.taskName, success, error })
	}

	return (
		<ListItem dense button onClick={handleClick}>
			<ListItemIcon>
				<ExtensionTwoToneIcon />
			</ListItemIcon>
			<ListItemText primary={dependencie.taskName} secondary={dependencie.dev + "." + dependencie.project} />
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={() => {deleteDependencie(dependencie.id)}}>
					<DeleteTwoToneIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default function DependenciesSection({ dependencies, hookTask }) {

	const { deleteDependencie, getForeingTask } = hookTask();
	const [open, setOpen] = useState(false);
	const [dependencie, setDependencie] = useState({});

	const popUp = ({ dependencie }) => {
		setDependencie(dependencie);
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
								<Dependencie dependencie={d} deleteDependencie={deleteDependencie} getForeingTask={getForeingTask} popUp={popUp} key={d.id} />
							)
						})
					}
					<Divider />
				</List>

				: ''
			}

			<DependencieInfoDialog open={open} setOpen={setOpen} dependencie={dependencie} />
			
		</Box>

	);
}

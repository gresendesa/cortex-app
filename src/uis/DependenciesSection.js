import React, { useState, useRef } from 'react';
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

function Dependencie({ dependencie, deleteDependencie, getForeingTask }){


	const handleClick = () => {
		console.log("tey")

		const success = (response) => {
			console.log('ok', response)
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

	return (

		<Box>
			{
				dependencies.length>0 ?

				<List dense component="nav" aria-label="main mailbox folders">
					<Divider />

					{
						dependencies.map(dependencie => {
							return (
								<Dependencie dependencie={dependencie} deleteDependencie={deleteDependencie} getForeingTask={getForeingTask} key={dependencie.id} />
							)
						})
					}
					<Divider />
				</List>

				: ''
			}
			
		</Box>
	);
}

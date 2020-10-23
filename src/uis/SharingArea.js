import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
}));

function RocketDev({ username, deleteHook }) {

	const [tryDel, setTryDel] = useState(false);

	const activePermanentDel = () => {
		setTryDel(true);
		setTimeout(() => {
			setTryDel(false);
		}, 1000);
	}

	useEffect(() => {
		if (tryDel) {
			setColor('secondary')
		} else {
			setColor('primary')
		}
	},[tryDel]);

	const handleDelete = (e) => {
		if(tryDel){
			deleteHook(username)
		} else {
			activePermanentDel();
		}
	}

	const [color, setColor] = useState('primary')

	return (
		<Chip label={username} onDelete={handleDelete} color={color} />
	)

}

export default function SharingArea({ project, addCollaborator, removeCollaborator, updateCollaborators, alert, width=290 }) {

	const classes = useStyles();

	const [accesses, setAccesses] = useState(project.collaborators)
	const [collaborator, setCollaborator] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setAccesses(project.collaborators)
	},[project])

	const onDelete = (username) => {
		const success = (response) => {
			updateCollaborators(response.detail, () => {
				alert().show({message: `${username} removed as collaborator`, severity: "success"});
			})
		}
		const error = (response) => {
			alert().show({message: `${response}`, severity: "error"});
		}
		removeCollaborator({ project_id: project.id, username: username, success, error })
	}

	const onAdd = () => {

		const success = (response) => {
			updateCollaborators(response.detail, () => {
				setLoading(false)
				alert().show({message: `${collaborator} added as collaborator`, severity: "success"});
				setCollaborator('')
			})
		}
		const error = (response) => {
			setLoading(false)
			alert().show({message: `${response}`, severity: "error"});
		}
		addCollaborator({ project_id: project.id, username: collaborator, success, error })
		setLoading(true)

	}

	return (	
		<Box width={width} >
			
			<TextField
				margin="dense"
				id="name"
				label="Add a collaborator"
				type="text"
				value={collaborator}
				onChange={(e) => {setCollaborator(e.target.value)}}
				fullWidth
				variant="outlined"
			/>
		
			<Button variant="outlined" color="primary" onClick={onAdd} fullWidth disabled={(String(collaborator).length == 0) || loading}>
				Add {collaborator}
			</Button>

			
			<Box mt={2} className={classes.root}>
				{
					accesses.map((access) => {
						return(<RocketDev key={access} username={access} deleteHook={onDelete} />)
					})
				}
			</Box>

		</Box>	
	)
}

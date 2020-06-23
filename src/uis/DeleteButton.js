import React, { useState, Fragment } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

export default function DeleteButton({ type='task', callback }) {

	const [tryDel, setTryDel] = useState(false);

	const activePermanentDel = () => {
		setTryDel(true);
		setTimeout(() => {
			setTryDel(false);
		}, 1000);
	}

	const handleClick = () => {
		if (tryDel) {
			if(window.confirm("A deleted project cannot be restored!")){
				callback();
			}
		} else {
			activePermanentDel();
		}
	}

	switch (type) {
		case 'task':
			return (
				tryDel ?
				<BottomNavigationAction label="Delete" onClick={handleClick} icon={<DeleteForeverIcon color='error' />} />
				:
				<BottomNavigationAction label="Delete" onClick={handleClick} icon={<DeleteIcon />} /> 
			)
			break;
		case 'trigger':
			return (
				<IconButton edge="end" aria-label="delete" onClick={handleClick}>
				{
					tryDel ?
					<DeleteForeverIcon color='error' />
					:
					<DeleteOutlineIcon />
				}
				</IconButton>
			)
		case 'dependencie':
			return (
				<IconButton edge="end" aria-label="delete" onClick={handleClick}>
				{
					tryDel ?
					<DeleteForeverIcon color='error' />
					:
					<DeleteTwoToneIcon />
				}
				</IconButton>
			)
		case 'project':
			return (
				<IconButton edge="end" aria-label="delete" onClick={handleClick}>
				{
					tryDel ?
					<DeleteForeverIcon color='error' />
					:
					<DeleteIcon />
				}
				</IconButton>
			)
		case 'event':
			return (
				<IconButton aria-label="delete" onClick={handleClick}>
				{
					tryDel ?
					<DeleteForeverIcon color='error' />
					:
					<DeleteIcon />
				}
				</IconButton>
			)
		default:
			break;

	}
		

}

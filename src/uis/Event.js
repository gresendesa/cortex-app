import React, { useState, useEffect } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import TextField from '@material-ui/core/TextField';

export default function Event({ event, deleteEvent, updateEvent }) {

	const [match, setMatch] = useState(event.match);
	const [argument, setArgument] = useState(event.argument);
	const [rule, setRule] = useState(event.rule);

	const toggleMatch = () => {
		setMatch(!match);
	}

	const handleRuleChange = (e) => {
		setRule(e.target.value);
	}

	const handleArgumentChange = (e) => {
		setArgument(e.target.value);
	}

	const handleDelete = () => {
		deleteEvent(event.id);
	}

	useEffect(() => {
		const copyEvent = Object.assign({}, event);
		copyEvent.match = match;
		copyEvent.argument = argument;
		copyEvent.rule = rule;
		updateEvent(copyEvent);
	}, [match, argument, rule]);

	return (
		<div>
			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField small="small" fullWidth label="Argument" value={argument} onChange={handleArgumentChange} variant="outlined" />
				</ListItem>
				<ListItem>
					<TextField small="small" fullWidth label="Rule" value={rule} onChange={handleRuleChange} variant="filled" />
				</ListItem>
				<ListItem>
					
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center">

						<Grid item>
							<FormControlLabel
								control={
								<Switch
									checked={match}
									onChange={toggleMatch}
									color="primary"
								/>
								}
								label="Regex"
							/>
						</Grid>

						<Grid item>
							<IconButton aria-label="add event" onClick={handleDelete}>
								<Delete />
							</IconButton>
						</Grid>

					</Grid>

				</ListItem>
			</List>
			<Divider />
		</div>
	);

}

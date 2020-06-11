import React, { useState } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import TextField from '@material-ui/core/TextField';


export default function Event({ event }) {

		const [match, setMatch] = useState(event.match);

		const toggleMatch = () => {
			setMatch(!match);
		}

	return (
		<div>
			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField small="small" fullWidth label="Argument" value={event.argument} variant="outlined" />
				</ListItem>
				<ListItem>
					<TextField small="small" fullWidth label="Rule" value={event.rule} variant="filled" />
				</ListItem>
				<ListItem>
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
				</ListItem>
			</List>
			<Divider />
		</div>
	);

}

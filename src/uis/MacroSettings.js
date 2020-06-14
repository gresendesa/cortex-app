
import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';

import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';

export default function MacroSettings({ openConfig, settings, hookTask }) {

	const { setOpenConfig, setMacroState } = hookTask();

	const [config, setConfig] = useState({
		'name': settings.name,
		'description': settings.description,
		'pname': settings.pname,
		'entrypoint': settings.entrypoint
	});

	const handleClose = () => {
		setOpenConfig(false);
		setMacroState(config);
	}

	const handleChange = (item, value) => {
		let obj = {};
		obj[item] = value;
		let copyConfig = Object.assign({}, config);
		copyConfig[item] = value;
		setConfig(copyConfig);
	}

	return(
		<Drawer anchor="right" open={openConfig} onClose={handleClose} >     
			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField small="small" fullWidth label="Macro name" value={config.name} onChange={(e) => {handleChange("name", e.target.value)}} variant="outlined" />
				</ListItem>
				<ListItem>
					<TextField small="small" fullWidth label="Description" value={config.description} onChange={(e) => {handleChange("description", e.target.value)}} variant="outlined" />
				</ListItem>
				<ListItem>
					<TextField small="small" fullWidth label="pname" value={config.pname} onChange={(e) => {handleChange("pname", e.target.value)}} variant="outlined" />
				</ListItem>
			</List>
			<Divider />
			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField small="small" fullWidth label="Task entrypoint" value={config.entrypoint} onChange={(e) => {handleChange("entrypoint", e.target.value)}} variant="outlined" />
				</ListItem>
			</List>
		  
		</Drawer>
	);

}
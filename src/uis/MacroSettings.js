
import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Delete from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import DrawerHeader from './DrawerHeader';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import SharingArea from './SharingArea';

const useStyles = makeStyles(theme => ({
  textarea: {
    resize: "both",
  }
}));

export default function MacroSettings({ openConfig, devName, settings, hookTask, project, addCollaborator, removeCollaborator, updateCollaborators }) {

	const classes = useStyles();

	const { setOpenConfig, setMacroState, deployMacro, alert } = hookTask();

	const [unsafeMode, setUnsafeMode] = useState(settings.unsafe!==null);
	const [unsafeValue, setUnsafeValue] = useState(settings.unsafe==null ? 100 : settings.unsafe);

	const [config, setConfig] = useState({
		'name': settings.name,
		'description': settings.description,
		'pname': settings.pname,
		'entrypoint': settings.entrypoint,
		'endpoint': settings.endpoint,
		'csid': settings.csid,
		'unsafe': settings.unsafe,
		'debug': settings.debug,
		'production': settings.production,
		'verbose': settings.verbose
	});

	useEffect(() => {
    if(!project) return;
    if(!project.macro) return;
    if(!project.macro.name) return;
    document.title = `Rocket · ${project.macro.name}`
  }, [project])

	const handleClose = () => {
		if(config.name.match(/[^a-zA-Z0-9À-ÿ·•\_-]|^$/)){
			alert("Project name should have just [a-zA-Z0-9À-ÿ·•\_-]", "error");
		} else if(config.pname.match(/[^a-zA-Z0-9\_]|^$/)){
			alert("pname should have just [a-zA-Z0-9\_]", "error");
		} else if(config.csid.match(/[^a-zA-Z0-9\_.-]|^$/)){
			alert("CloudScript id should have just [a-zA-Z0-9\_-]");
		} else {
			setOpenConfig(false);
			setMacroState(config, () => {
				deployMacro({ launch:false })
			});
		}
	}

	const handleChange = (item, value) => {
		let obj = {};
		obj[item] = value;
		let copyConfig = Object.assign({}, config);
		copyConfig[item] = value;
		setConfig(copyConfig);
	}

	const handleUnsafeValue = (e) => {
		handleChange("unsafe", e.target.value);
		setUnsafeValue(e.target.value);
	}

	const toggleUnsafeMode = () => {
		if(unsafeMode){
			handleChange("unsafe", null);
		} else {
			handleChange("unsafe", unsafeValue);
		}
		setUnsafeMode(!unsafeMode);
	}

	const prefixDevName = devName.toLowerCase() + ".";

	const sharingAlertInterface = () => {
		return {
			show: ({message, severity}) => {
				alert(message, severity)
			}
		}
	}

	return(

		<Drawer anchor="right" open={openConfig} onClose={handleClose} >  

			<DrawerHeader onClose={handleClose} />

			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField margin="dense" small="small" fullWidth label="Macro name" value={config.name} onChange={(e) => {handleChange("name", e.target.value)}} variant="outlined" />
				</ListItem>
				<ListItem>
					<TextField
						margin="dense"
						id="outlined-textarea"
						label="Description"
						small="small"
						placeholder="Talk about your task here"
						value={config.description}
						onChange={(e) => {handleChange("description", e.target.value)}}
						multiline
						variant="outlined"
						inputProps={{ className: classes.textarea }}
						fullWidth
					/>
				</ListItem>
				<ListItem>
					<TextField margin="dense" small="small" fullWidth label="pname" value={config.pname} onChange={(e) => {handleChange("pname", e.target.value)}} variant="outlined" />
				</ListItem>
			</List>
			<Divider />
			<List aria-label="main mailbox folders">
				<ListItem>
					<Grid
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
						spacing={3}>

						<Grid item xs={6}>
							<TextField
								margin="dense"
								label="Unsafe"
								type="number"
								value={unsafeValue}
								onChange={handleUnsafeValue}
								disabled={!unsafeMode}
								variant="outlined"
							/>
						</Grid>

						<Grid item xs={6}>
						  	<FormControlLabel
							control={
								<Switch
									checked={unsafeMode}
									onChange={toggleUnsafeMode}
									color="primary"
							  	/>
								}
							label="Unsafe"
							/>
						</Grid>
					
					</Grid>

				</ListItem>
			</List>
			<Divider />
			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField margin="dense" small="small" fullWidth label="Task entrypoint" value={config.entrypoint} onChange={(e) => {handleChange("entrypoint", e.target.value)}} variant="outlined" />
				</ListItem>
				<ListItem>
					<TextField margin="dense" small="small" fullWidth label="Task endpoint" value={config.endpoint} onChange={(e) => {handleChange("endpoint", e.target.value)}} variant="outlined" />
				</ListItem>
			</List>
			<Divider />
			<List aria-label="main mailbox folders">
				<ListItem>
					<TextField margin="dense" small="small" fullWidth label="CloudScript id" value={config.csid} 
							   onChange={(e) => {handleChange("csid", e.target.value)}} 
							   variant="outlined"
					/>
				</ListItem>
				<Divider />
				<ListItem>
        	<SharingArea project={project} addCollaborator={addCollaborator} removeCollaborator={removeCollaborator} updateCollaborators={updateCollaborators} alert={sharingAlertInterface} />
        </ListItem>
        <Divider />
			</List>
			<List aria-label="main mailbox folders">
				<ListItem>
					<Grid
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
						spacing={3}>

						<Grid item xs={6}>
						  	<FormControlLabel
							control={
								<Switch
									checked={config.debug}
									onChange={(e) => {handleChange("debug", !config.debug)}}
									color="primary"
							  	/>
								}
							label="Debug"
							/>
						</Grid>

						<Grid item xs={6}>
						  	<FormControlLabel
							control={
								<Switch
									checked={config.verbose}
									onChange={(e) => {handleChange("verbose", !config.verbose)}}
									color="primary"
							  	/>
								}
							label="Verbose"
							/>
						</Grid>
					
					</Grid>

				</ListItem>
			</List>
		  
		</Drawer>
	);

}
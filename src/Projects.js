import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import CodeIcon from '@material-ui/icons/Code';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DataContext } from './contexts/DataContext';
import Server from './server';
import ProjectCreateDialog from './uis/ProjectCreateDialog';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import DeleteButton from './uis/DeleteButton';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green, indigo } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';

import { timeDifference } from './uis/utils';

function ProjectItem({ p, redirectToProject, removeProject, isUserSuper }) {

	const useStyles = makeStyles((theme) => ({
	  avatarProject: {
	    width: theme.spacing(5),
	    height: theme.spacing(5),
	    color: theme.palette.getContrastText(green[500]),
	    backgroundColor: green[500],
	  },
	  avatarNoneProject: {
	    width: theme.spacing(5),
	    height: theme.spacing(5),
	    color: theme.palette.getContrastText(indigo[500]),
	    backgroundColor: indigo[500],
	  }
	}));

	const classes = useStyles();

	const [lastSave, setLastSave] = useState(timeDifference(p.date));

	setInterval(() => {
		setLastSave(timeDifference(p.date));
	}, 1000);

	return (
		<ListItem button onClick={() => {redirectToProject(p)}}>
			<ListItemAvatar>
				{p.macro.protocol == 'CTRL' && <Avatar className={classes.avatarProject}>
					<PlayArrowRoundedIcon />
				</Avatar>}
				{p.macro.protocol == 'NONE' && <Avatar className={classes.avatarNoneProject}>
					<CodeIcon /> 
				</Avatar>}
			</ListItemAvatar>
			<Tooltip title={"Saved " + lastSave + " before"}>
				<ListItemText
					primary={p.macro.name}
					secondary={isUserSuper ? (p.dev + (p.macro.description ? ' • ' + p.macro.description : '')) : (p.macro.description)}
					/>
			</Tooltip>
				
			<ListItemSecondaryAction>
				<DeleteButton type='project' confirmString={p.macro.name} callback={() => {removeProject(p.id)}} />
			</ListItemSecondaryAction>
		</ListItem>
	)

}

class Projects extends React.Component {

	static contextType = DataContext;

	state = {
		'openCreateDialog': false,
	}

	componentWillMount(){

		const success = (response) => {
			this.props.setIsUserSuper(response.super);
		}
		const error = (response) => {
			
		}
		this.props.fetchMacros({ success, error });

	}

	createProject = (project) => {
		const success = (response) => {
			
		}
		const error = (response) => {
			
		}
		this.props.addMacro({ macro:project, success, error });
	}

	removeProject = (id) => {
		const success = (response) => {
			
		}
		const error = (response) => {
		
		}
		this.props.delMacro({ id:id, success, error });
	}

	redirectToProject = (p) => {
		const { history } = this.props;
		if(p.macro.protocol == 'CTRL'){
			history.push(`/project/${p.id}`);
		} else if (p.macro.protocol == 'NONE'){
			history.push(`/project/flat/${p.id}`);
		}	
	}

	render(){

		//console.log(this.context)

		return (
			<div>

				<Grid container
				  direction="row"
				  justify="space-between"
				  alignItems="center">
					
					<Grid item>
						<Box component="span" m={1}>
							<Typography variant="h5" color="primary">
								{this.props.isUserSuper ? 'Rocket Projects' : 'My Projects'}
							</Typography>
						</Box>
					</Grid>

					<Grid item>
						<Box component="span" m={1}>
							<Typography>
								<IconButton onClick={() => {this.setState({openCreateDialog: !this.state.openCreateDialog})}} aria-label="add project" >
									<AddIcon fontSize="large" />
								</IconButton>
							</Typography>
						</Box>

					</Grid>

				</Grid>

				<List>
					
					{

						this.props.macros.length > 0 ?
						this.props.macros.map(p => {
							return (
								<ProjectItem key={p.id} p={p} redirectToProject={this.redirectToProject} removeProject={this.removeProject} isUserSuper={this.props.isUserSuper} />
							)
						})
						:
						<Alert severity="info">
							<AlertTitle>No projects loaded</AlertTitle>
						</Alert>
					}


				</List>

				<ProjectCreateDialog open={this.state.openCreateDialog} setOpen={(bool) => {this.setState({openCreateDialog: bool})}} createProject={this.createProject} />

			</div>

		);

	}

}

export default Projects;
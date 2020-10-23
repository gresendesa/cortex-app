import React, { Fragment, useState, useEffect } from 'react';
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
import { fade, makeStyles } from '@material-ui/core/styles';
import { deepOrange, green, indigo, blue } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

import { timeDifference } from './uis/utils';

function SearchWidget({ projects, redirectToProject, removeProject, isUserSuper, username }) {
	const useStyles = makeStyles((theme) => ({
	  search: {
	    position: 'relative',
	    borderRadius: theme.shape.borderRadius,
	    backgroundColor: fade(theme.palette.common.white, 0.15),
	    '&:hover': {
	      backgroundColor: fade(theme.palette.common.white, 0.25),
	    },
	    marginRight: theme.spacing(0),
	    marginLeft: 0,
	    width: '100%',
	    [theme.breakpoints.up('sm')]: {
	      marginLeft: theme.spacing(0),
	      width: 'auto',
	    },
	  },
	  searchIcon: {
	    padding: theme.spacing(0, 2),
	    height: '100%',
	    position: 'absolute',
	    pointerEvents: 'none',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
	  inputRoot: {
	    color: 'inherit',
	  },
	  inputInput: {
	    padding: theme.spacing(1, 1, 1, 0),
	    // vertical padding + font size from searchIcon
	    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
	    transition: theme.transitions.create('width'),
	    width: '100%',
	    [theme.breakpoints.up('md')]: {
	      width: '20ch',
	    },
	  },
	}));



	const classes = useStyles();

	const [searchResultProjects, setsearchResultProjects] = useState(projects);
	const [searchString, setSearchString] = useState('')

	const handleSearch = (e) => {
		setSearchString(e.target.value)
	}

	useEffect(() => {
		setsearchResultProjects(projects);
	},[projects]);

	useEffect(() => {
		if(searchString!=''){
			setsearchResultProjects(projects.filter((p) => {
				return (p.macro.name.toLowerCase().includes(searchString.toLowerCase()) || p.dev.toLowerCase().includes(searchString.toLowerCase()) || p.macro.description.toLowerCase().includes(searchString.toLowerCase()));
			}));
		} else {
			setsearchResultProjects(projects);
		}
	},[searchString])

	return (
		<div>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search…"
					value={searchString}
					onChange={handleSearch}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
			<div>
				<List>
								
					{
						searchResultProjects.length > 0 ? 
						searchResultProjects.map(p => {
							return (
								<ProjectItem key={p.id} p={p} redirectToProject={redirectToProject} removeProject={removeProject} isUserSuper={isUserSuper} username={username} />
							)
						}) : 
						<Alert severity="info">
							<AlertTitle>No projects</AlertTitle>
						</Alert>
					}


				</List>
			</div>
		</div>
	)
}


function ProjectItem({ p, redirectToProject, removeProject, isUserSuper, username }) {

	const useStyles = makeStyles((theme) => ({
	  avatarProject: {
	    width: theme.spacing(5),
	    height: theme.spacing(5),
	    color: theme.palette.getContrastText(green[500]),
	    backgroundColor: green[500]
	  },
	  avatarNoneProject: {
	    width: theme.spacing(5),
	    height: theme.spacing(5),
	    color: theme.palette.getContrastText(indigo[500]),
	    backgroundColor: indigo[500]
	  },
	  sharedProject: {
	  	width: theme.spacing(5),
	    height: theme.spacing(5),
	    color: theme.palette.getContrastText(blue[500]),
	    backgroundColor: blue[500]
	  }
	}));

	const classes = useStyles();

	const [lastSave, setLastSave] = useState(timeDifference(p.date));

	const DefaultIcon = ({ p, classes }) => {
		return (
			<div>
				{p.macro.protocol == 'CTRL' && <Avatar className={classes.avatarProject}>
					<PlayArrowRoundedIcon />
				</Avatar>}
				{p.macro.protocol == 'NONE' && <Avatar className={classes.avatarNoneProject}>
					<CodeIcon /> 
				</Avatar>}
			</div>
		)
	}

	return (
		<ListItem button onClick={() => {redirectToProject(p)}}>
			<ListItemAvatar>
				{username != p.dev ? 
					<Avatar className={classes.sharedProject}>
						{
							p.macro.protocol == 'CTRL' &&
								<GroupIcon fontSize='small' />
						}
						{
							p.macro.protocol == 'NONE' &&
								<PeopleOutlineIcon fontSize='small' />
						}
					</Avatar>
				:
					<DefaultIcon p={p} classes={classes} />}
			</ListItemAvatar>
			<Tooltip title={"Saved " + lastSave + " before"}>
				<ListItemText
					primary={p.macro.name}
					secondary={username != p.dev ? (p.dev + (p.macro.description ? ' • ' + p.macro.description : '')) : (p.macro.description)}
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
		//this.props.fetchMacros({ success, error });

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

				<Grid 
					container
					direction="column"
					justify="space-evenly"
					alignItems="stretch"
				>
				
					<Grid item>
						<SearchWidget projects={this.props.macros} redirectToProject={this.redirectToProject} removeProject={this.removeProject} isUserSuper={this.props.isUserSuper} username={this.props.username} />
					</Grid>
				</Grid>

				<ProjectCreateDialog open={this.state.openCreateDialog} setOpen={(bool) => {this.setState({openCreateDialog: bool})}} createProject={this.createProject} />

			</div>

		);

	}

}

export default Projects;
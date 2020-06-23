import React, { Fragment } from 'react';
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
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DataContext } from './contexts/DataContext';
import Server from './server';
import ProjectCreateDialog from './uis/ProjectCreateDialog';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import DeleteButton from './uis/DeleteButton';


class Projects extends React.Component {

	static contextType = DataContext;

	state = {
		'openCreateDialog': false,
	}

	componentWillMount(){

		const success = (response) => {
			console.log("ok", response.projects);
		}
		const error = (response) => {
			console.log(response);
		}
		this.props.fetchMacros({ success, error });

	}

	createProject = (project) => {
		const success = (response) => {
			console.log("ok", response);
		}
		const error = (response) => {
			console.log(response);
		}
		this.props.addMacro({ macro:project, success, error });
	}

	removeProject = (id) => {
		const success = (response) => {
			console.log("ok", response);
		}
		const error = (response) => {
			console.log(response);
		}
		this.props.delMacro({ id:id, success, error });
	}

	redirectToProject = (id) => {
		const { history } = this.props;
		history.push(`/project/${id}`);
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
								My Projects
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
								<ListItem button key={p.id} onClick={() => {this.redirectToProject(p.id)}}>
									<ListItemAvatar>
										<Avatar>
											<SportsEsportsIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={p.macro.name}
										secondary={p.macro.description}
										/>
									<ListItemSecondaryAction>
										<DeleteButton type='project' callback={() => {this.removeProject(p.id)}} />
									</ListItemSecondaryAction>
								</ListItem>
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
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

class Projects extends React.Component {

	static contextType = DataContext;

	state = {
		'openCreateDialog': false,
	}

	componentWillMount(){

		this.props.fetchMacros();

	}

	createProject = (input) => {
		console.log(input)
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
						this.props.macros.map(p => {
							return (
								<ListItem button key={p.id}>
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
											<IconButton edge="end" aria-label="delete">
												<DeleteIcon />
											</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)
						})
					}


				</List>

				<ProjectCreateDialog open={this.state.openCreateDialog} setOpen={(bool) => {this.setState({openCreateDialog: bool})}} createProject={this.createProject} />

			</div>

		);

	}

}

export default Projects;
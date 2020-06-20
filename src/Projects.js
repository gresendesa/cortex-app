import React from 'react';
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

class Projects extends React.Component {

	render(){

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
								<IconButton aria-label="add task" onClick={false}>
									<AddIcon fontSize="large" />
								</IconButton>
							</Typography>
						</Box>

					</Grid>

				</Grid>

				<List>
					
					<ListItem button>
						<ListItemAvatar>
							<Avatar>
								<SportsEsportsIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Single-line item"
							/>
						<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="delete">
									<DeleteIcon />
								</IconButton>
						</ListItemSecondaryAction>
					</ListItem>

					<ListItem button>
						<ListItemAvatar>
							<Avatar>
								<SportsEsportsIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Single-line item"
							/>
						<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="delete">
									<DeleteIcon />
								</IconButton>
						</ListItemSecondaryAction>
					</ListItem>

				</List>
			</div>

		);

	}

}

export default Projects;
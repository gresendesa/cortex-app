import React, { useState } from 'react';
import TaskPanel from './uis/TaskPanel';
import TasksSection from './uis/TasksSection';
import { DataContext } from './contexts/DataContext';
import { Typography, Box, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class Macro extends React.Component {

	constructor(){
		super();
	}

	render(){

		return (
			<DataContext.Consumer>{(data) => {

				return (

					<React.Fragment>

						<Grid container
						  direction="row"
						  justify="space-between"
						  alignItems="center">
							
							<Grid item>
								<Box component="span" m={1}>
									<Typography variant="h5">Tasks 
										<Typography color="textSecondary"> Macro {data.name}</Typography> 
									</Typography>
								</Box>
							</Grid>

							<Grid item>
								<Box component="span" m={1}>
									<Typography>
										<IconButton aria-label="add task">
											<AddIcon />
										</IconButton>
									</Typography>
								</Box>
							</Grid>

						</Grid>

						<TasksSection tasks={data.tasks} />

					</React.Fragment>

				);
			}}
			</DataContext.Consumer>
		)

	}

}

export default Macro;
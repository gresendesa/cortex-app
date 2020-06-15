import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontSize: '80%',
    marginTop: '32px',
    marginBottom: '16px',
    backgroundColor: theme.palette.background.paper,
  },

}));

export default function Footer() {

	const classes = useStyles();

	return(
		<Grid container
				  direction="row"
					justify="center"
					alignItems="center">
			<Grid item>
				<Box className={classes.root}>
					Federal • Macrosoft ® 2021
				</Box>
			</Grid>
		</Grid>
	)

}	
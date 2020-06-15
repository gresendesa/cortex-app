import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
 }));

export default function DrawerHeader({ onClose }) {

	const classes = useStyles();
	const theme = useTheme();

	return(
		<div className={classes.drawerHeader}>
			<IconButton onClick={onClose}>
				<ChevronLeftIcon />
			</IconButton>
		</div>
	)
}
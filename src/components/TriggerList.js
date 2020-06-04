import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import TaskListDrag from './TaskListDrag'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList({ triggers }) {
  const classes = useStyles();

  var uiTriggers = triggers.map((trigger, indice) => {

    return (

      <ListItem button key={indice}>
        <ListItemAvatar>
          <Avatar>
            <CodeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={trigger.name} secondary="trigger" />
      </ListItem>
    )

  });

  return (
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
      <Grid item>
        <List className={classes.root}>
          
          {uiTriggers}

          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <AddIcon color="primary"/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create" secondary="new trigger" />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

import React, { useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Trigger from '../Trigger';
import TriggerCreateDialog from './TriggerCreateDialog';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },

}));

export default function TriggerList({ task, group, hookTask }) {

  const classes = useStyles();
  const history = useHistory();
  const triggers = task.triggers[group];

  const { editTask, alert } = hookTask();

  const [open, setOpen] = useState(false);

  const handleCreateClick = () => {
    setOpen(true);
  }

  const hasTrigger = (trigger) => {
    const tempTask = Object.assign({}, task);
    return tempTask.triggers[group].some(t => {
      return t.name == trigger.name
    })
  }

  const pushTrigger = (trigger) => {
    const tempTask = Object.assign({}, task);
    tempTask.triggers[group].push(trigger);
    editTask(tempTask);
  }

  const hookTrigger = () => {
    return {
      hasTrigger,
      pushTrigger
    }
  }

  const moveUp = (trigger) => {
    let copyTriggers = Object.assign([], triggers);
    let index = copyTriggers.findIndex((t) => {
      return t.id == trigger.id
    });
    if(index>0){
      let aboveTrigger = copyTriggers[index-1]
      copyTriggers[index-1] = copyTriggers[index];
      copyTriggers[index] = aboveTrigger;
      let tempTask = Object.assign({}, task);
      tempTask.triggers[group] = copyTriggers;
      editTask(tempTask);
    }
  }

  return (
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
      <Grid item>
        <List className={classes.root}>
          
          {

            triggers.map((trigger, indice) => {
              return (
                <Trigger indice={indice} moveUp={moveUp} group={group} task={task} trigger={trigger} key={indice} hookTask={hookTask} />
              ) 
            })

          }

          <ListItem button onClick={handleCreateClick}>
            <ListItemAvatar>
              <Avatar className={classes.orange}>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create" secondary="new trigger" />
          </ListItem>
          <TriggerCreateDialog open={open} setOpen={setOpen} group={group} hookTrigger={hookTrigger} alert={alert} />
        </List>
      </Grid>
    </Grid>
  );
}
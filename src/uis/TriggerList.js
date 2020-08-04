import React, { useState, useEffect } from 'react';
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
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

}));

export default function TriggerList({ task, group, hookTask, editorMode }) {

  const classes = useStyles();
  const history = useHistory();
  //const triggers = task.triggers[group];

  const [triggers, setTriggers] = useState(task.triggers[group])

  const { editTask, alert, setFocus } = hookTask();

  useEffect(() => {
    const tempTask = Object.assign({}, task);
    tempTask.triggers[group] = triggers;
    editTask(tempTask);
  }, [triggers])

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
    const tempTriggers = Object.assign([], triggers);
    tempTriggers.push(trigger);
    setTriggers(tempTriggers);
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
      setTriggers(copyTriggers);
    }
    setFocus({'task': task, 'group': group})
  }

  const deleteTrigger = (trigger) => {
    let copyTriggers = Object.assign([], triggers);
    let newTriggers = copyTriggers.filter((t) => {
      return t.id !== trigger.id
    });
    setTriggers(newTriggers);
    setFocus({'task': task, 'group': group})
  }

  const toggleActiveTrigger = (trigger) => {
    let copyTriggers = Object.assign([], triggers);
    let copyTrigger = Object.assign({}, trigger);
    copyTrigger.active = !copyTrigger.active;
    let index = copyTriggers.findIndex((t) => {
      return t.id == trigger.id
    });
    if(index>=0){
      copyTriggers[index] = copyTrigger;
      setTriggers(copyTriggers);
    }
    setFocus({'task': task, 'group': group})
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
                <Trigger 
                  indice={indice} 
                  moveUp={moveUp} 
                  group={group} 
                  task={task} 
                  trigger={trigger} 
                  key={trigger.id} 
                  hookTask={hookTask} 
                  deleteTrigger={deleteTrigger} 
                  toggleActiveTrigger={toggleActiveTrigger} 
                  editorMode={editorMode} 
                />
              ) 
            })

          }

          <ListItem button onClick={handleCreateClick}>
            <ListItemAvatar>
              <Avatar className={classes.orange}>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New action" />
          </ListItem>
          <TriggerCreateDialog open={open} setOpen={setOpen} group={group} hookTrigger={hookTrigger} alert={alert} />
        </List>
      </Grid>
    </Grid>
  );
}
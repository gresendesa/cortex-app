import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SaveIcon from '@material-ui/icons/Save';
import { Icon } from 'semantic-ui-react';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import translateTriggerGroup from './utils';
import { triggerModel } from '../mock/models'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Add from '@material-ui/icons/Add';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';

import Event from './Event';
import DrawerHeader from './DrawerHeader';

import { eventModel } from '../mock/models';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
  },
  editor: {
    backgroundColor: 'green',
  },
  events: {
    backgroundColor: 'inherit',
  },
  toolBar: {
    backgroundColor: 'gray',
  },
  breadCrumb: {
    marginRight: theme.spacing(1),
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TriggerForm({ task, trigger, open, toggleEditor, group, saveTrigger, alert, setFocus, deployMacro, active }) {
  const classes = useStyles();

  const [events, setEvents] = useState(Object.assign([], trigger.events));

  const [openEvents, setOpenEvents] = useState(false);

  const [openConfig, setOpenConfig] = useState(false);

  const [name, setName] = useState(trigger.name);
  const [action, setAction] = useState(trigger.action);
  const [blocking, setBlocking] = useState(trigger.blocking);

  const [deploying, setDeploying] = useState(false);

  const handleClose = () => {
    toggleEditor();
    setFocus({'task': task, 'group': group});
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleActionChange = (newValue) =>  {
    setAction(newValue);
  }

  const hasTrigger = (trigger) => {
    let filteredTriggers = task.triggers[group].filter(t => {
      return t.id !== trigger.id;
    })
    let has = filteredTriggers.some(t => {
      return t.name == trigger.name;
    });
    return has;
  }

  const onSave = (publish) => {

    setDeploying(true);

    let newTrigger = triggerModel({ 'name':name, 'action':action, 'id':trigger.id, 'blocking':blocking, 'events':events, 'active':active })
    if(name.match(/"|^$/)){
      alert("Invalid name");
    } else if(!hasTrigger(newTrigger)){
      
      if(publish){
        saveTrigger(newTrigger,() => {
          deployMacro({ launch:true, callback: () => {setDeploying(false)}})
        });
      } else {
        saveTrigger(newTrigger,() => {
          deployMacro({ launch:false, callback: () => {setDeploying(false)}})
        });
      }
    } else {
      alert("Action name is already taken");
    }
  }

  const onEventsClose = () => {
    setOpenEvents(false);
  }

  const onConfigClose = () => {
    setOpenConfig(false);
  }

  const handleOpenEvents = () => {
    setOpenEvents(true);
  }

  const handleOpenConfig = () => {
    setOpenConfig(true);
  }

  const pushBlankEvent = () => {
    setEvents([...events, eventModel({})])
  }

  const deleteEvent = (id) => {
    const eventsFiltered = events.filter(e => {
      return e.id !== id; 
    });
    setEvents(eventsFiltered);
  }

  const updateEvent = (event) => {
    const eventIndex = events.findIndex(e => {
      return e.id == event.id;
    });
    const copyEvents = Object.assign([], events);
    copyEvents[eventIndex]=event;
    setEvents(copyEvents);
  }

  //<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title} >
              {name}
            </Typography>
            <Box className={classes.breadCrumb}>
              {task.name} • {translateTriggerGroup(group)}
              </Box>

            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <IconButton edge="end" disabled={deploying} color="inherit" onClick={() => {onSave()}} aria-label="close">
                <SaveIcon />
              </IconButton>
              <IconButton edge="end" disabled={deploying} color="inherit" onClick={() => {onSave(true)}} aria-label="close">
                <Icon name='rocket' size='small' />
              </IconButton>
            </ButtonGroup>

          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid 
            item container
            direction="row"
            justify="space-between"
            alignItems="center"
            sm={12}> 
            
            <Grid item>
              <Button color="primary" onClick={handleOpenEvents}>
                Required Conditions
              </Button>
            </Grid>

            <Grid item>
              <IconButton aria-label="add task" onClick={handleOpenConfig}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>

          </Grid>
        </Grid>

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
          >

          <Grid item xs={12} className={classes.editor}>
            <AceEditor 
              mode="javascript"
              theme="monokai"
              value={action}
              onChange={handleActionChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={20}
              width="100%"
            />

            <Drawer anchor="right" open={openConfig} onClose={onConfigClose} >

              <DrawerHeader onClose={onConfigClose} />

              <List aria-label="main mailbox folders">
                <ListItem>
                  <TextField value={name} small="small" onChange={(e) => { setName(e.target.value) }} label="Action name" variant="outlined" />  
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={blocking}
                        onChange={() => {setBlocking(!blocking)}}
                        color="primary"
                      />
                    }
                    label="Blocking"
                  />
                </ListItem>
              </List>

            </Drawer>

            <Drawer anchor="left" open={openEvents} onClose={onEventsClose}>
              
              <DrawerHeader onClose={onEventsClose} />

              {

                events.map((e, k) => {
                  return (
                    <Event event={e} key={k} deleteEvent={deleteEvent} updateEvent={updateEvent} />
                  )
                })

              }

              <IconButton aria-label="add event" onClick={pushBlankEvent}>
                <Add />
              </IconButton>

            </Drawer>

          </Grid>

        </Grid>
        
      </Dialog>
    </div>
  );
}

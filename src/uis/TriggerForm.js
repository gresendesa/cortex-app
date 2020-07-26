import React, { useState, useEffect, useRef } from 'react';
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
import "ace-builds/src-noconflict/ext-language_tools";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Add from '@material-ui/icons/Add';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';

import Event from './Event';
import DrawerHeader from './DrawerHeader';
import Indenter from '../Indenter';
import EventIcon from '@material-ui/icons/Event';
import CodeIcon from '@material-ui/icons/Code';

import { eventModel } from '../mock/models';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import { cortexMacroModCommands } from '../data/CortexMacroModCommands';

import IconTipButton from './IconTipButton';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
  },
  actionButton: {
    marginLeft: theme.spacing(0.05),
  },
  containerEditor: {
    backgroundColor: '#2f3129',
    height:'100vh',
  },
  editor: {
    height:'80vh',
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

export default function TriggerForm({ task, trigger, open, toggleEditor, group, saveTrigger, alert, setFocus, deployMacro, active, getActionCode }) {
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

  const saveButtonRef = useRef(null);
  const launchButtonRef = useRef(null);
  const kodeButtonRef = useRef(null);
  const indentButtonRef = useRef(null);
  const eventsButtonRef = useRef(null);
  const editButtonRef = useRef(null);

  const onSave = (publish, callback=()=>{}) => {

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

  const getCode = () => {
    setDeploying(true);
    getActionCode({ id: trigger.id, name: trigger.name, task_name: task.name, section:group, callback:() => {setDeploying(false);} });
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

  const handleIndent = () => {
    const lines = action.split('\n');
    const indenter = new Indenter(lines);
    const result = indenter.indent();
    setAction(result);
  }

  var CortexCompleter ={
      getCompletions: function(editor, session, pos, prefix, callback) {
          var completions = cortexMacroModCommands;
          callback(null, completions);
      }
  }

  //<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} className={classes.dialog} TransitionComponent={Transition} >
        <AppBar className={classes.appBar} style={{ background: '#357a38' }}>
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
              <IconTipButton edge="end" tip="Save CTRL+S" disabled={deploying} color="inherit" reference={saveButtonRef} onClick={() => {onSave()}}>
                <SaveIcon />
              </IconTipButton>
              <IconTipButton edge="end" tip="See Kode CTRL+K" disabled={deploying} color="inherit" reference={kodeButtonRef} onClick={() => {getCode()}}>
                <CodeIcon />
              </IconTipButton>
              <IconTipButton edge="end" tip="Launch CTRL+L" disabled={deploying} color="inherit" reference={launchButtonRef}  onClick={() => {onSave(true)}}>
                <Icon name='rocket' size='small' />
              </IconTipButton>
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
              <IconTipButton edge="start" tip="Manage events CTRL+E" color="inherit" reference={eventsButtonRef} onClick={handleOpenEvents} className={classes.actionButton} aria-label="close">
                <EventIcon />
              </IconTipButton>
              <IconTipButton edge="start" tip="Indent code" color="inherit" reference={indentButtonRef} onClick={handleIndent} className={classes.actionButton} aria-label="close">
                <FormatAlignRightIcon />
              </IconTipButton>
            </Grid>

            <Grid item>
              <Box>
                <IconButton ref={editButtonRef} onClick={handleOpenConfig}>
                  <EditIcon fontSize="small"/>
                </IconButton>
              </Box>
            </Grid>

          </Grid>
        </Grid>

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            className={classes.containerEditor}
          >

          <Grid item xs={12} className={classes.editor}>
            <AceEditor 
              onLoad={(editor) => {
                editor.focus();
                editor.setValue(editor.getValue(), -1);
                editor.completers = [editor.completers[0],editor.completers[1],CortexCompleter];
              }}
              mode="javascript"
              theme="monokai"
              value={action}
              onChange={handleActionChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: Infinity }}
              fontSize={20}
              tabSize={2}
              showPrintMargin={false}
              width="100%"
              height="100%"
              commands={[
                {   
                  name: 'save', 
                  bindKey: {win: 'Ctrl-S', mac: 'Command-S'}, 
                  exec: () => {saveButtonRef.current.click()} 
                },
                {   
                  name: 'launch', 
                  bindKey: {win: 'Ctrl-L', mac: 'Command-L'}, 
                  exec: () => {launchButtonRef.current.click()} 
                },
                {   
                  name: 'kode', 
                  bindKey: {win: 'Ctrl-K', mac: 'Command-K'}, 
                  exec: () => {kodeButtonRef.current.click()}
                },
                /*{   
                  name: 'indent', 
                  bindKey: {win: 'Ctrl-I', mac: 'Command-I'}, 
                  exec: () => {indentButtonRef.current.click()}
                },*/
                {   
                  name: 'events', 
                  bindKey: {win: 'Ctrl-E', mac: 'Command-E'}, 
                  exec: () => {eventsButtonRef.current.click()}
                },
                {   
                  name: 'props', 
                  bindKey: {win: 'Ctrl-P', mac: 'Command-P'}, 
                  exec: () => {editButtonRef.current.click()}
                }
              ]}
              setOptions={{
                enableLiveAutocompletion: true,
                enableSnippets: true,
                animatedScroll: true
              }}
            />

            <Drawer anchor="right" open={openConfig} onClose={onConfigClose} >

              <DrawerHeader onClose={onConfigClose} />

              <List aria-label="main mailbox folders">
                <ListItem>
                  <TextField margin="dense" value={name} small="small" onChange={(e) => { setName(e.target.value) }} label="Action name" variant="outlined" />  
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

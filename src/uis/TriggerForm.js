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
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-javascript";
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

import { onLoadAce, editorThemer } from './utils';

import { eventModel } from '../mock/models';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import { cortexMacroModCommands } from '../data/CortexMacroModCommands';

import IconTipButton from './IconTipButton';
import InfoButton from './InfoButton';

import AddTemplateButton from './AddTemplateButton';


import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";

import ChangeThemeButton from './ChangeThemeButton';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '60vw'
  },
  location: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '20vw'
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
    display: 'flex',
    justifyContent: 'space-between'
  },
  breadCrumb: {
    marginRight: theme.spacing(1),
  },
  buttons:{
    float: 'right'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TriggerForm({ project, task, trigger, open, toggleEditor, group, saveTrigger, alert, setFocus, deployMacro, active, getActionCode, getTemplateInfo, getDoc, editorMode, getPublicTemplates }) {
  const classes = useStyles();

  const [events, setEvents] = useState(Object.assign([], trigger.events));

  const [openEvents, setOpenEvents] = useState(false);

  const [openConfig, setOpenConfig] = useState(false);

  const [name, setName] = useState(trigger.name);
  const [action, setAction] = useState(trigger.action);
  const [blocking, setBlocking] = useState(trigger.blocking);

  const [deploying, setDeploying] = useState(false);
  const [indentSwitch, setIndentSwitch] = useState(false);

  const [infoButtonSubject, setInfoButtonSubject] = useState(null);
  const infoSourcesHook = () => {
    return {
      getTemplateInfo:getTemplateInfo,
      getDoc: getDoc
    }
  }

  const themeContext = 'trigger';
  const [theme, setTheme] = useState(editorThemer().loadTheme(themeContext));
  const updateTheme = (theme) => {
    editorThemer().updateTheme(themeContext, aceEditor.current.editor, theme)
  }

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

  const handleIndent = (e) => {
    const lines = action.split('\n');
    const indenter = new Indenter(lines);
    var result = null;
    if(indentSwitch){
      result = indenter.indent('    ');
    } else {
      result = indenter.indent();
    }
    setAction(result);
    setIndentSwitch(!indentSwitch);
  }

  var CortexCompleter ={
      getCompletions: function(editor, session, pos, prefix, callback) {
          var completions = cortexMacroModCommands;
          callback(null, completions);
      }
  }

  const aceEditor = useRef()

  const addLineAtCurrentPosition = line => {
    if(aceEditor.current !== undefined){
      let editor = aceEditor.current.editor
      editor.session.insert(editor.getCursorPosition(), line)
    }
  }

  useEffect(() => {
    console.log(aceEditor)
  }, [aceEditor])

  //<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} className={classes.dialog} TransitionComponent={Transition} >
        <AppBar className={classes.appBar} style={{ background: '#357a38' }}>
          <Toolbar className={classes.toolBar}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title} >
              {name}
            </Typography>
            <Box className={classes.breadCrumb}>
              <Typography className={classes.location} >
                {task.name} • {translateTriggerGroup(group)}
              </Typography>
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
              <IconTipButton edge="start" tip="Indent code" color="inherit" reference={indentButtonRef} onClick={handleIndent} onDoubleClick={handleIndent} className={classes.actionButton} aria-label="close">
                <FormatAlignRightIcon />
              </IconTipButton>

              <AddTemplateButton getPublicTemplates={getPublicTemplates} addLine={addLineAtCurrentPosition} successAlert={(message) =>  alert(message, 'success')}/>

              <ChangeThemeButton context={themeContext} theme={theme} setTheme={updateTheme} />

              <InfoButton editorMode={editorMode} subject={infoButtonSubject} sourcesHook={infoSourcesHook} project={project} error_alert={(message) => alert(message, 'error')}/>

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
              onLoad={ onLoadAce({ editorMode, setInfoButtonSubject, completer: CortexCompleter }) }
              mode="javascript"
              theme={theme}
              value={action}
              ref={aceEditor}
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

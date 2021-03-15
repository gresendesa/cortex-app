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
import { templateModel, triggerModel } from '../mock/models'
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
import IconTipButton from './IconTipButton'

import Event from './Event';
import DrawerHeader from './DrawerHeader';
import Indenter from '../Indenter';
import EventIcon from '@material-ui/icons/Event';

import InfoButton from './InfoButton';

import { onLoadAce } from './utils';

import { eventModel } from '../mock/models';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import { cortexMacroModCommands } from '../data/CortexMacroModCommands';

import AddTemplateButton from './AddTemplateButton';

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
  textarea: {
    resize: "both",
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TemplateEditor({ open, setOpen, template, namespace, saveTemplate, getTemplateInfo, getDoc, showAlert, editorMode, getPublicTemplates }) {
  
  const classes = useStyles();
  const [openConfig, setOpenConfig] = useState(false);

  const [name, setName] = useState(template.name);
  const [code, setCode] = useState(template.code);
  const [description, setDescription] = useState(template.description); 
  const [processing, setProcessing] = useState(false);
  const [indentSwitch, setIndentSwitch] = useState(false);

  useEffect(() => {
    setName(template.name);
    setCode(template.code);
    setDescription(template.description);
  }, [template]);

  const saveButtonRef = useRef(null);
  const indentButtonRef = useRef(null);
  const editButtonRef = useRef(null);

  const handleIndent = (e) => {
    const lines = code.split('\n');
    const indenter = new Indenter(lines);
    var result = null;
    if(indentSwitch){
      result = indenter.indent('    ');
    } else {
      result = indenter.indent();
    }
    setCode(result);
    setIndentSwitch(!indentSwitch);
  }

  const [infoButtonSubject, setInfoButtonSubject] = useState(null);

  const infoSourcesHook = () => {
    return {
      getTemplateInfo:getTemplateInfo,
      getDoc: getDoc
    }
  }

  var CortexCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
          var completions = cortexMacroModCommands;
          callback(null, completions);
      }
  }

  const onConfigClose = () => {
    setOpenConfig(false);
  }

  const handleOpenConfig = () => {
    setOpenConfig(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleTemplateNameChange = (e) => {
    setName(e.target.value);
  }

  const handleTemplateCodeChange = (value) => {
    setCode(value);
  }

  const handleSave = (content) => {
    const copyTemplate = Object.assign({}, template);
    copyTemplate.name = name;
    copyTemplate.code = content;
    copyTemplate.description = description;

    if(copyTemplate.name.match(/[^a-zA-Z0-9À-ÿ·•\_-]|^$/)){

      showAlert({message: "Template name should contain just [^a-zA-Z0-9À-ÿ·•\_-] chars", severity: "error"});

    } else {

      setProcessing(true);
      const callback = (ok, message) => {
        if(ok){
          showAlert({message: "Saved", severity: "success"});
        } else {
          showAlert({message, severity: "error"});
        }
        setProcessing(false);
      }

      saveTemplate(copyTemplate, true, callback);

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

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
        <AppBar className={classes.appBar} color="primary">
          <Toolbar className={classes.toolBar}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title} >
              {name}
            </Typography>
            <Box className={classes.breadCrumb}>
              <Typography className={classes.location}>
                {namespace.name}
              </Typography>
            </Box>
            <IconTipButton edge="end" tip="Save CTRL+S" disabled={processing} reference={saveButtonRef} color="inherit" onClick={() => handleSave(code)} aria-label="close">
              <SaveIcon />
            </IconTipButton>
          
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
              <IconTipButton edge="start" tip="Indent code" color="inherit" reference={indentButtonRef} onClick={handleIndent} onDoubleClick={handleIndent} className={classes.actionButton} aria-label="close">
                <FormatAlignRightIcon />
              </IconTipButton>
              
              <AddTemplateButton getPublicTemplates={getPublicTemplates} addLine={addLineAtCurrentPosition} successAlert={(message) =>  showAlert({message, severity: "success"})}/>


              <InfoButton editorMode={editorMode} subject={infoButtonSubject} sourcesHook={infoSourcesHook} error_alert={(message) => showAlert({message, severity: "error"})}/>
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
              theme="monokai"
              value={code}
              ref={aceEditor}
              onChange={handleTemplateCodeChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={20}
              tabSize={2}
              width="100%"
              height="100%"
              showPrintMargin={false}
              commands={[
                {   
                  name: 'save', 
                  bindKey: {win: 'Ctrl-S', mac: 'Command-S'}, 
                  exec: editor => {saveButtonRef.current.click()}
                },
                /*{   
                  name: 'indent', 
                  bindKey: {win: 'Ctrl-I', mac: 'Command-I'}, 
                  exec: editor => {indentButtonRef.current.click()}
                },*/
                {   
                  name: 'props', 
                  bindKey: {win: 'Ctrl-P', mac: 'Command-P'}, 
                  exec: editor => {editButtonRef.current.click()}
                },
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
                  <TextField margin="dense" value={name} small="small" onChange={handleTemplateNameChange} label="Action name" variant="outlined" />  
                </ListItem>
                <ListItem>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    fullWidth
                    multiline
                    variant="outlined"
                    inputProps={{ className: classes.textarea }}
                  />
                </ListItem>
              </List>

            </Drawer>

          </Grid>

        </Grid>
        
      </Dialog>
    </div>
  );
}

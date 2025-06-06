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
import "ace-builds/src-noconflict/ext-searchbox";
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

import { handleJump } from './utils';


import { eventModel } from '../mock/models';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import { cortexMacroModCommands } from '../data/CortexMacroModCommands';



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

export default function BuildPanel({ open, setOpen, code, projectName, editorMode, theme = 'monokai' }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
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
              {projectName}
            </Typography>
          </Toolbar>
        </AppBar>
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

                editor.setOptions({
                  fontFamily: "Monospace",
                  fontSize: "12pt"
                });

                editor.focus();
                editor.setValue(editor.getValue(), -1);
                editor.getSession().setMode(editorMode);

                editor.getSession().getSelection().on('changeSelection',(delta)=>{
      
                  
                  const selectedText = editor.getSession().getTextRange();
                  if(selectedText.length!=0){
                    const start = editor.getSelectionRange().start.row;
                    const end = editor.getSelectionRange().end.row;
                    if(start==end){
                      var wholelinetxt = editor.session.getLine(start);
                      //editor.getSelection().clearSelection();
                      handleJump({line: wholelinetxt, word: selectedText, editor: editor, sourceLineNumber: start})
                    }
                  }
                  

                });


              }}

              mode="javascript"
              theme={theme}
              value={code}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              tabSize={2}
              readOnly={true}
              showPrintMargin={false}
              width="100%"
              height="100%"
              setOptions={{
                animatedScroll: true
              }}
            />
          </Grid>

        </Grid>
        
      </Dialog>
    </div>
  );
}

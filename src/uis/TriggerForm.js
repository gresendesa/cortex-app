import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TriggerForm({ taskName, trigger, open, toggleEditor, group, saveTrigger }) {
  const classes = useStyles();

  const [content, setContent] = useState(trigger.action);

  const handleClose = () => {
    toggleEditor();
  };

  const onChange = (newValue) =>  {
    setContent(newValue);
  }

  const onSave = () => {
    saveTrigger(triggerModel({ 'name':trigger.name, 'action':content, 'id':trigger.id }));
    //toggleEditor();
  }

  var fooFunc = () => {
    console.log("ok");
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
               <TextField value={trigger.name} variant="outlined" />  
            </Typography>
            <Button autoFocus color="inherit" onClick={onSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container className={classes.toolBar}>
          <Grid sm={12}> 
            
            {taskName} • {translateTriggerGroup(group)}

          </Grid>
        </Grid>

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
          >

          <Grid item md={3} xs={4} className={classes.events}>
          

            <List aria-label="main mailbox folders">
              <ListItem>
                <TextField small="small" fullWidth label="Subject" variant="outlined" />
              </ListItem>
              <ListItem>
                <TextField small="small" fullWidth label="Rule" variant="filled" />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={fooFunc}
                      onChange={fooFunc}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Regex"
                />
              </ListItem>
            </List>
            <Divider />
          
          </Grid>

          <Grid item md={9} xs={8} className={classes.editor}>
            <AceEditor 
              mode="javascript"
              theme="monokai"
              value={content}
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={20}
              width="100%"
            />,
          </Grid>

        </Grid>
        
      </Dialog>
    </div>
  );
}

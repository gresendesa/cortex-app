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
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TriggerForm({ taskName, trigger, open, toggleEditor, group }) {
  const classes = useStyles();

  const [content, setContent] = useState(trigger.content);

  const handleClose = () => {
    toggleEditor();
  };

  const onChange = (newValue) =>  {
    setContent(newValue);
  }

  const onSave = () => {
    console.log("saved", content);
    toggleEditor();
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {taskName} • {translateTriggerGroup(group)} • {trigger.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={onSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container mt={4}>

          <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
            >

            <Grid item xs={3} >
              
            </Grid>

            <Grid item xs={9}>
              <AceEditor
                mode="javascript"
                theme="github"
                value={content}
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                fontSize={20}
              />,
            </Grid>

          </Grid>

          
        </Container>
        
      </Dialog>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles(theme => ({
  textarea: {
    resize: "both",
  }
}));

export default function TaskEditDialog({ task, edit, setEdit, editTask, hasTask, alert, hasMacroUnsafe }) {

  const classes = useStyles();

  const [unsafe, setUnsafe] = useState((task.unsafe!==null) && (!hasMacroUnsafe()))
  const [unsafeNumber, setUnsafeNumber] = useState(task.unsafe)
  const [delay, setDelay] = useState(task.delay)
  const [visible, setVisible] = useState(task.visible)
  const [name, setName] = useState(task.name)
  const [description, setDescription] = useState(task.description) 

  const handleClose = () => {
    setEdit(false);
  }

  const handleToggleUnsafe = () => {
    if (hasMacroUnsafe()){
      alert("Unsafe mode is set globally already");
    }  
    setUnsafe(!unsafe);
  }

  const handleToggleVisible = () => {
    setVisible(!visible);
  }

  const handleUnsafeNumber = (e) => {
    if (hasMacroUnsafe()){
      alert("Unsafe mode is set globally already");
    }
    setUnsafeNumber(e.target.value);
  }

  const handleDelay = (e) => {
    setDelay(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSave = () => { 

    let tempTask = Object.assign({}, task);
    tempTask.name = name;
    tempTask.delay = delay;
    tempTask.visible = visible;
    tempTask.description = description;
    tempTask.unsafe = unsafe ? unsafeNumber : null;

    if(name.match(/ |"|'|;|^$/)){
      alert("Don't use spaces or especial chars!");
    } else if(!hasTask(tempTask, true)){
      editTask(tempTask)
      setEdit(false);
    } else {
      alert("This name is already taken from other task!");
    }

  }

  const handleKeyPressed = (e) => {
    if(e.key=='Enter'){
      handleSave();
    }
  }

  return (
    <div>
      <Dialog open={edit} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit the task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give props to your task
          </DialogContentText>
          
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >

            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Task name"
                type="text"
                value={name}
                onChange={handleName}
                fullWidth
                onKeyPress={handleKeyPressed}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Delay"
                type="number"
                value={delay}
                size="small"
                onChange={handleDelay}
                onKeyPress={handleKeyPressed}
              />
            </Grid>    
            
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >

            <Grid item xs={12} md={4}>
              <TextField
                label="Unsafe"
                type="number"
                value={unsafeNumber}
                size="small"
                onChange={handleUnsafeNumber}
                disabled={!unsafe}
                onKeyPress={handleKeyPressed}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={unsafe}
                    onChange={handleToggleUnsafe}
                    color="primary"
                  />
                }
                label="Unsafe"
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={visible}
                    onChange={handleToggleVisible}
                    color="primary"
                  />
                }
                label="Public"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="Talk about your task here"
                value={description}
                onChange={handleDescription}
                multiline
                inputProps={{ className: classes.textarea }}
                fullWidth
                onKeyPress={handleKeyPressed}
              />
            </Grid>

          </Grid>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
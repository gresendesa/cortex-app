import React, { useState, useEffect } from 'react';
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

export default function TaskEditDialog({ task, edit, setEdit, editTask, hasTask, alert, hasMacroUnsafe }) {

  const [unsafe, setUnsafe] = useState((task.unsafe!==null) && (!hasMacroUnsafe()))
  const [unsafeNumber, setUnsafeNumber] = useState(task.unsafe)
  const [delay, setDelay] = useState(task.delay)
  const [name, setName] = useState(task.name)

  const handleClose = () => {
    setEdit(false);
  }

  const handleToggleUnsafe = () => {
    if (hasMacroUnsafe()){
      alert("Unsafe mode is set globally already");
    }  
    setUnsafe(!unsafe);
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

  const handleSave = () => { 

    let tempTask = Object.assign({}, task);
    tempTask.name = name;
    tempTask.delay = delay;
    tempTask.unsafe = unsafe ? unsafeNumber : null;

    if(name.match(/ |"|^$/)){
      alert("Invalid name");
    } else if(!hasTask(tempTask, true)){
      editTask(tempTask)
      setEdit(false);
    } else {
      alert("This name is already taken from other task!");
    }

  }

  return (
    <div>
      <Dialog open={edit} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit the task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write an unique alphanumeric word, without spaces, as a name for the task
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
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Delay"
                type="number"
                value={delay}
                size="small"
                onChange={handleDelay}
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

            <Grid item xs={6}>
              <TextField
                label="Unsafe"
                type="number"
                value={unsafeNumber}
                size="small"
                onChange={handleUnsafeNumber}
                disabled={!unsafe}
              />
            </Grid>

            <Grid item xs={6}>
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
            
          </Grid>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
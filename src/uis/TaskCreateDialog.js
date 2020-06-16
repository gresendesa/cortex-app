import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';
import { taskModel } from '../mock/models';

export default function TaskCreateDialog({ hookTask }) {

  var { open, toggleCreateDialog, pushTask, hasTask, alert } = hookTask();
  var [value, setValue] = useState('');

  const handleClose = () => {
    toggleCreateDialog();
  };

  const handleSave = (e) => { 
    var task = taskModel({ 'name': value })

    if(task.name.match(/ |"|^$/)){
      alert("Invalid name!");
    } else if(!hasTask(task)){
      pushTask(task)
      toggleCreateDialog();
    } else {
      alert("This name is already taken from other task!");
    }

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write an unique alphanumeric word, without spaces, as a name for the task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            onChange={(e) => {setValue(e.target.value)}}
            fullWidth
            draggable
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Create task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
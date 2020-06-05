import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';

export default function TaskCreateDialog({ hookNewTask }) {

  var [open, toogleDialog, pushTask, hasTask] = hookNewTask();
  var value = '';

  const handleClose = () => {
    toogleDialog();
  };

  const handleSave = (e) => { 
    var task = {'name': value, 'id':uuidv1()}
    if(!hasTask(task)){
      pushTask(task)
      toogleDialog();
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write a unique word, without spaces, as a name for the task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            onChange={(e) => {value = e.target.value; console.log(value)}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
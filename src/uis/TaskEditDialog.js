import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';

export default function TaskEditDialog({ task, edit, setEdit, editTask, hasTask, alert }) {

  const [tempTask, setTempTask] = useState(task);

  const handleClose = () => {
    setEdit(false);
  };

  const handleSave = () => { 

    if(!hasTask(tempTask, true)){
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            value={tempTask.name}
            onChange={(e) => { setTempTask({...tempTask, 'name': e.target.value }) }}
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
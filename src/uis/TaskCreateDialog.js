import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';
import { taskModel, dependencieModel } from '../mock/models';

export default function TaskCreateDialog({ hookTask }) {

  var { open, toggleCreateDialog, pushTask, hasTask, alert, pushDependencie, hasDependencie } = hookTask();
  var [value, setValue] = useState('');

  const handleClose = () => {
    toggleCreateDialog();
  };

  const handleImport = (e) => {

    const [dev, project] = value.split('.',2);

    const nameItems = value.split('.');
    nameItems.splice(0, 2);
    const taskName = nameItems.join('.');
    var dependencie = dependencieModel({ dev, project, taskName });

    if((dependencie.dev) && (dependencie.dev.length>0) &&
       (dependencie.project) && (dependencie.project.length>0) &&
       (dependencie.taskName) && (dependencie.taskName.length>0)){

      if(dependencie.taskName.match(/ |"|'|;|^$/)){
        alert("Don't use spaces or especial chars!");
      } else if((!hasTask({name:dependencie.taskName})) && (!hasDependencie(dependencie))){
        pushDependencie(dependencie);
        toggleCreateDialog();
      } else {
        alert("This name is already taken from other task!");
      }

    } else {
      alert("Use the <dev>.<project>.<task>");
    }
  }

  const handleSave = (e) => { 
    var task = taskModel({ 'name': value })

    if(task.name.match(/ |"|'|;|^$/)){
      alert("Don't use spaces or especial chars!");
    } else if((!hasTask(task)) && (!hasDependencie({taskName:task.name, id:task.id}))){
      pushTask(task)
      toggleCreateDialog();
    } else {
      alert("This name is already taken from other task!");
    }

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create or import a new task
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
          <Button onClick={handleImport} color="primary">
            Import task
          </Button>
          <Button onClick={handleSave} color="primary">
            Create task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
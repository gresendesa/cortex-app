import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';
import { taskModel, dependencieModel } from '../mock/models';

export default function TaskCreateDialog({ hookTask }) {

  var { open, toggleCreateDialog, pushTask, hasTask, alert, pushDependencie, hasDependencie, getForeingTask, getForeingTasks } = hookTask();
  var [value, setValue] = useState('');

  const handleClose = () => {
    toggleCreateDialog();
  };

  const handleImport = (e) => {

    const parse_dependencie = (str) => {

      const [dev, project] = str.split('.',2);

      const nameItems = str.split('.');
      nameItems.splice(0, 2);
      const taskName = nameItems.join('.');
      return dependencieModel({ dev, project, taskName });

    }

    const push_dependencie = (dependencie) => {
      if(dependencie.taskName.match(/ |"|'|;|^$/)){
        alert("Don't use spaces or especial chars!");
        return false;
      } else if((!hasTask({name:dependencie.taskName})) && (!hasDependencie(dependencie))){
        
        const success = () => {
          pushDependencie(dependencie);
          toggleCreateDialog();
        }
        const error = (response) => {
          alert(response);
        }
        getForeingTask({ dev: dependencie.dev, project: dependencie.project, task:dependencie.taskName, success, error })
        return true;
      } else {
        return false;
      }
    }

    const dependencie = parse_dependencie(value);

    if((dependencie.dev) && (dependencie.dev.length>0) &&
       (dependencie.project) && (dependencie.project.length>0)){

      if((dependencie.taskName) && (dependencie.taskName.length>0)){
        if(!push_dependencie(dependencie)){
          alert(`'${dependencie.taskName}' name is already taken from other task!`);
        }
      } else {

        const success = (data) => {
          var not_imported = [];
          var imported = [];
          data.tasks.map(dependencie_str => {
            const dependencie = parse_dependencie(dependencie_str);
            if((!hasTask({name:dependencie.taskName})) && (!hasDependencie(dependencie))){
              imported.push(dependencie)
            } else {
              not_imported.push(dependencie.taskName);
            }
          })
          pushDependencie(imported);
          if(not_imported.length > 0){
            alert(`'${not_imported.join(',')}' tasks names are already taken!`);
          }
          toggleCreateDialog();
        }
        const error = (response) => {
          alert(response);
        }

        getForeingTasks({ dev:dependencie.dev, project:dependencie.project, success, error })
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

  const handleKeyPressed = (e) => {
    if(e.key=='Enter'){
      handleSave();
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
            onKeyPress={handleKeyPressed}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImport} color="primary">
            Import
          </Button>
          <Button onClick={handleSave} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
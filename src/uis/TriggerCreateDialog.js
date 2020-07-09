import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v1 as uuidv1 }  from 'uuid';
import translateTriggerGroup from './utils';
import { triggerModel } from '../mock/models';


export default function TriggerCreateDialog({ open, setOpen, group, hookTrigger, alert }) {

  var [value, setValue] = useState('');

  const { hasTrigger, pushTrigger } = hookTrigger();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => { 

    let trigger = triggerModel({ 'name':value });

    if(trigger.name.match(/"|^$/)){
      alert("Invalid name")
    } else if(!hasTrigger(trigger)){
      setOpen(false);
      pushTrigger(trigger);
    } else {
      alert("This action name is already taken");
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
        <DialogTitle id="form-dialog-title">Create new action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write an unique name, into the {translateTriggerGroup(group)} group, as an identificator for the action
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Action name"
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
          <Button onClick={handleSave} color="primary">
            Create Action
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
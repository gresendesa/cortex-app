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

export default function TriggerCreateDialog({ open, setOpen, group, hookTrigger, alert }) {

  var [value, setValue] = useState('');

  const { hasTrigger, pushTrigger } = hookTrigger();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => { 

    let trigger = {
      'name': value,
      'content': '',
      'id': uuidv1()
    }

    if(!hasTrigger(trigger)){
      setOpen(false);
      pushTrigger(trigger);
    } else {
      alert("This trigger name is already taken");
    }

    
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new trigger</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write an unique name, into the {translateTriggerGroup(group)} group, as an identificator for the trigger
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Trigger name"
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
            Create Trigger
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
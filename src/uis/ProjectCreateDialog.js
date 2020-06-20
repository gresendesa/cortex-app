import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { taskModel } from '../mock/models';

export default function ProjectCreateDialog({ open, setOpen, createProject }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const handleSave = (e) => { 
    createProject({ name: name, description: description });
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new project and start editing!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            fullWidth
            draggable
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            fullWidth
            draggable
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Create project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
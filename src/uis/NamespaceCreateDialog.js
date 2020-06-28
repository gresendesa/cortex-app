import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { taskModel, macroModel } from '../mock/models';

export default function NamespaceCreateDialog({ open, setOpen, createProject }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const handleSave = (e) => {

    const success = () => {

    }

    const error = () => {
      
    }

    const model = macroModel({ 
                                name, 
                                description, 
                                debug: false, 
                                production: true, 
                                pname:name.replace(' ','').toLowerCase(), 
                                entrypoint: 'main', 
                                unsafe: null,
                                csid: name.replace(' ','').toLowerCase() + String(Math.random()).replace('.',''), 
                                dependencies: [], 
                                tasks: []
                              });
    createProject(model);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new namespace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a namespace to put your templates!
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
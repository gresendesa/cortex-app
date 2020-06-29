import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { taskModel, macroModel } from '../mock/models';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textarea: {
    resize: "both",
  }
}));

export default function TemplateCreateDialog({ open, setOpen, namespace, createTemplate }) {

  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const handleSave = (e) => {
    if(createTemplate({ name, description })){
      handleClose();
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new template</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a template to use on your macros!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Namespace"
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            fullWidth
            multiline
            inputProps={{ className: classes.textarea }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
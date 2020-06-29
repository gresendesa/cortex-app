import React, { useState, useEffect } from 'react';
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

export default function NamespaceEditDialog({ open, setOpen, namespace, updateNamespace }) {

  useEffect(() => {
    setName(namespace.name);
    setDescription(namespace.description);
  }, [namespace])

  const classes = useStyles();
  const [name, setName] = useState(namespace.name);
  const [description, setDescription] = useState(namespace.description);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => {
    const namespaceCopy = Object.assign({}, namespace);
    namespaceCopy.name = name;
    namespaceCopy.description = description;
    if (updateNamespace(namespaceCopy)){
      handleClose();
    } else {
      console.log("issue");
    }
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
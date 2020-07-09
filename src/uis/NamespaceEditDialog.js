import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { taskModel, macroModel } from '../mock/models';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles(theme => ({
  textarea: {
    resize: "both",
  }
}));

export default function NamespaceEditDialog({ open, setOpen, namespace, updateNamespace }) {

  useEffect(() => {
    setName(namespace.name);
    setDescription(namespace.description);
    setVisible(namespace.visible);
  }, [namespace])

  const classes = useStyles();
  const [name, setName] = useState(namespace.name);
  const [visible, setVisible] = useState(namespace.visible);
  const [description, setDescription] = useState(namespace.description);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => {
    const namespaceCopy = Object.assign({}, namespace);
    namespaceCopy.name = name;
    namespaceCopy.description = description;
    namespaceCopy.visible = visible;
    if (updateNamespace(namespaceCopy)){
      handleClose();
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
        <DialogTitle id="form-dialog-title">Edit your library</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose new props to your library.
          </DialogContentText>
          
          <Grid container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >

            <Grid item xs={6} md={8}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Library name"
                type="text"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                fullWidth
                onKeyPress={handleKeyPressed}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={visible}
                    onChange={() => {setVisible(!visible)}}
                    color="primary"
                  />
                }
                label="Public"
              />
            </Grid>

          </Grid>
            
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
            onKeyPress={handleKeyPressed}
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
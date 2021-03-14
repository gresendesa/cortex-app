import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { taskModel, macroModel, plainMacroModel } from '../mock/models';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textarea: {
    resize: "both",
  }
}));

export default function ProjectCreateDialog({ open, setOpen, createProject, alert }) {

  const classes = makeStyles();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [plain, setPlain] = useState(false);


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

    if(name.match(/[^a-zA-Z0-9À-ÿ·•\_-]|^$/)){
      window.alert("Project name should have just [a-zA-Z0-9À-ÿ·•\_-]", "error");
    } else {
      
      var model = null;
      if(plain){
        model = plainMacroModel({ 
                                  name, 
                                  description, 
                                  csid: name.toLowerCase() + String(Math.random()).replace('.',''), 
                                });


      } else {
        model = macroModel({ 
                            name, 
                            description, 
                            debug: false, 
                            production: true, 
                            pname:name.replace(/[\s.-]*/g,'').toLowerCase(), 
                            entrypoint: 'main', 
                            unsafe: null,
                            csid: name.toLowerCase() + String(Math.random()).replace('.',''), 
                            dependencies: [], 
                            tasks: []
                          });
      }
        
      createProject(model);
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
        <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new project and start editing!
          </DialogContentText>
          <Grid container>

            <Grid container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={3}>

              <Grid item xs={12} md={9}>
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
                  onKeyPress={handleKeyPressed}
                />

              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={plain}
                      onChange={() => setPlain(!plain)}
                      color="primary"
                      />
                    }
                  label="Flat"
                />

              </Grid>

            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="name"
                label="Description"
                type="text"
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
                fullWidth
                draggable
                multiline
                inputProps={{ className: classes.textarea }}
              />
            </Grid>

          </Grid>        
              
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
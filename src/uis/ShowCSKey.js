import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { green, pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';


import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ShowCSKey({ csKey, setCsKey }) {

  //const downloadLink = 'https://dl.dropboxusercontent.com/s/xlqzjv581i76ssh/RocketLocalServer.jar?dl=0';

  const [showMessage, setShowMessage] = useState(false);

  const useStyles = makeStyles((theme) => ({
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
  }));

  const classes = useStyles();

  const handleClose = () => {
    setCsKey(null);
  };

  const inputRef = useRef(null);

  const handleCopy = (e) => {
    inputRef.current.select();
    document.execCommand('copy');
    setShowMessage(true);
  }

  const handleSelect = (e) => {
    inputRef.current.select();
    document.execCommand('copy');
    setShowMessage(true);
  }

  return (
    <div>
      <Dialog maxWidth='md' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={csKey} TransitionComponent={Transition}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >

            <Grid item>
              <Typography variant="subtitle1">{'Here we go'} {' '}</Typography>
            </Grid>

            <Grid item>
              Take your CloudScript key
            </Grid>

          </Grid>

          
        </DialogTitle>
        <DialogContent>

          <TextField fullWidth margin="dense" value={csKey} onFocus={handleSelect} inputRef={inputRef} small="small" label="Your CloudScript key" variant="outlined" />  

          <Box mt={2}>
            Do not share this key with other people! 
          </Box>
          
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleCopy} color="secondary">
            Copy it!
          </Button>
        </DialogActions>

        <Snackbar open={showMessage} autoHideDuration={2000} onClose={() => {setShowMessage(false)}} >
          <MuiAlert elevation={6} variant="filled" severity="success">
            Key copied to clipboard!
          </MuiAlert>
        </Snackbar>

      </Dialog>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
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
import CodeIcon from '@material-ui/icons/Code';

import { green, pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';


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

export default function GorlemCommandInfo({ open, setOpen, doc }) {

  const useStyles = makeStyles((theme) => ({
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
  }));

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCode = () => {
    handleClose(); 
  }

  const [name, setName] = useState(null);
  const [extendedName, setExtendedName] = useState(null);
  const [description, setDescription] = useState(null);
  const [since, setSince] = useState(null);

  useEffect(() => {
    setName(doc.name);
    setExtendedName(doc.extendedName);
    setDescription(doc.description);
    setSince(doc.sinceVersion)
  }, [doc]);

  return (
    <div>
      <Dialog maxWidth='md' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >

            <Grid item>
              <Typography variant="subtitle1">{name} {' '}</Typography>
            </Grid>

            <Grid item>
             from <a href={"https://beta.mkb.gorlem.ml/docs/actions/" + name }>Gorlem doc</a>
            </Grid>

          </Grid>

          
        </DialogTitle>
        <DialogContent dividers>

          {

            extendedName && extendedName.length>0 ?

            <Typography style={{'white-space': 'pre-line'}} variant="h6">
              <strong>{extendedName}</strong>
            </Typography>
            :
            {name}

          }

          {

            extendedName && extendedName.length>0 ?

            <Typography style={{'white-space': 'pre-line'}} variant="subtitle2">
              <strong>Since Minecraft {since.minecraft}</strong>
            </Typography>
            :
            {name}

          }

          <Box mt={2}>
            {

              description && description.length>0 ?

              <Typography style={{'white-space': 'pre-line'}} variant="body2">
                {ReactHtmlParser(description)}
              </Typography>
              :
              <strong>No description provided</strong>

            }
          </Box>
          
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleClose} color="primary">
            Ok. Got it
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

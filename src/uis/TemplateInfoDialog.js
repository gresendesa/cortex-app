import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
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

export default function TemplateInfoDialog({ open, setOpen, template, showCodeHandler }) {

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
    showCodeHandler(code);
  }

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [library, setLibrary] = useState(null);
  const [dev, setDev] = useState(null);
  const [code, setCode] = useState(null);

  useEffect(() => {
    setName(template.name);
    setDescription(template.description);
    setLibrary(template.library);
    setDev(template.dev);
    setCode(template.code);
  }, [template]);

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
              <Typography variant="h6">{library}{' • '}{name} {' '}</Typography>
            </Grid>

            <Grid item>
             by {dev}
            </Grid>

          </Grid>

          
        </DialogTitle>
        <DialogContent dividers>

          {

            description && description.length>0 ?

            <Typography style={{'white-space': 'pre-line'}} variant="body2">
              {ReactHtmlParser(description)}
            </Typography>
            :
            <strong>No description provided</strong>

          }
          

        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleCode} color="primary">
            <Avatar className={classes.green}>
              <CodeIcon />
            </Avatar>
          </Button>

          <Button autoFocus onClick={handleClose} color="primary">
            Ok. Got it
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

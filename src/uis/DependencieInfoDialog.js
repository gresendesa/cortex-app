import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
  },
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

export default function DependencieInfoDialog({ open, setOpen, dependencie, task }) {

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth='xs' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >

            <Grid item>
              <Typography variant="h6">{dependencie.taskName} {' '}</Typography>
            </Grid>

            <Grid item>
             by {dependencie.dev}
            </Grid>

          </Grid>

          
        </DialogTitle>
        <DialogContent dividers>

          {

            task.description && task.description.length>0 ?

            <Typography style={{'white-space': 'pre-line'}}>
              {task.description}
            </Typography>

            :

            <strong>No description provided</strong>

          }
          

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

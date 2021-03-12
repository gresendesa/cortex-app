import React, { useState, useEffect } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListSubheader from '@material-ui/core/ListSubheader';

import FolderIcon from '@material-ui/icons/Folder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function Library(props) {

  const [open, setOpen] = useState(false);
  const { key, lib, devname, addLine, successAlert } = props; 

  const handleClick = () => {
    setOpen(!open);
  };

  const useStyles = makeStyles((theme) => ({

    nested: {
      paddingLeft: theme.spacing(4),
    },

  }));

  const handlePick = e => {
    successAlert(`'${devname}.${lib.name}.${e}' imported sucessfully`)
    addLine(`\n{* import '${devname}.${lib.name}.${e}' as ${e.toUpperCase()} *}`)
  }

  const classes = useStyles();

  return (

    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FolderIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={<i>{lib.name}</i>} />
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {
            lib.templates.map((templateName, index) => {
              return (
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={<i>{templateName}</i>} onClick={() => {
                    handlePick(templateName)
                  }} />
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>
    </React.Fragment>
  )
}


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

const DialogTitleClose = withStyles(styles)((props) => {
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



export default function SimpleDialog(props) {


  const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    accord: {
      width: '400px',
    }

  }));

  const classes = useStyles();
  const { onClose, libraries, setLibraries, addLine, successAlert } = props;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
    setLibraries([])
  };

  useEffect(() => {
    console.log(libraries)
    if(libraries.length > 0){
      setOpen(true)
    }
  },[libraries])

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={'sm'} fullWidth>
      <DialogTitleClose onClose={handleClose}>
        <Typography variant={'h6'}>
          Public templates
        </Typography>
      </DialogTitleClose>
      {
        libraries.map((libs, index) => {
          return(
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
              <Typography className={classes.heading}><i>{libs.devname}</i></Typography>
              </AccordionSummary>
              
              {
                libs.libraries.map((lib, index2) => {

                  return(
                    <Grid container key={index2}>
                      <Grid item xs={12}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          className={classes.root}
                          dense
                        >

                          <Library lib={lib} devname={libs.devname} addLine={addLine} successAlert={successAlert} />

                        </List>
                      </Grid>
                    </Grid>
                  )

                })
              }

            </Accordion>
          )
        })
      }
      <DialogTitle>
        <Typography variant={'subtitle2'}>
          Click over a template to import it automatically
        </Typography>
      </DialogTitle>
    </Dialog>
  );
}


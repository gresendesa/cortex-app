import React, { useState, useEffect } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

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

function Library(props) {

  const [open, setOpen] = useState(false);
  const { key, lib, devname, addLine } = props; 

  const handleClick = () => {
    setOpen(!open);
  };

  const useStyles = makeStyles((theme) => ({

    nested: {
      paddingLeft: theme.spacing(4),
    },

  }));

  const handlePick = e => {
    
    addLine(`\n{* import '${devname}.${lib.name}.${e}' as ${e.toUpperCase()} *}`)
  }

  const classes = useStyles();

  return (

    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FolderIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={lib.name} />
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            lib.templates.map((templateName, index) => {
              return (
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={templateName} onClick={() => {
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
  const { onClose, libraries, setLibraries, addLine } = props;

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
      {
        libraries.map((libs, index) => {
          return(
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
              <Typography className={classes.heading}>{libs.devname}</Typography>
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
                        >

                          <Library lib={lib} devname={libs.devname} addLine={addLine} />

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
      
    </Dialog>
  );
}


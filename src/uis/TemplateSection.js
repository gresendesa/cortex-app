import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { alltemplates } from '../data/templates';
import NamespaceCreateDialog from './NamespaceCreateDialog';
import { namespaceModel, templateModel } from '../mock/models';
import { deepOrange, green, blueGrey } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';
import SaveIcon from '@material-ui/icons/Save';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const TemplateList = withStyles((theme) => {
  return {
      root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
  }
})(List);

const useStyles = makeStyles((theme) => ({
  avatarTemplate: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },

  avatarNewTemplate: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },

  avatarNamespace: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },

}));

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiExpansionPanelDetails);

const TemplateItem = ({ template }) => {

  const classes = useStyles();

  return (

    <ListItem button>
      <ListItemAvatar>
        <Avatar className={classes.avatarTemplate}>
          <CodeIcon  />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={template.name}
        
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>

  )

}


const TemplatePanel = ({ index, namespace, expanded, setExpanded, handleChange }) => {

  const classes = useStyles();
  const toggleExpanded = () => {
    if ((expanded!==index) || (expanded==null)) {
      setExpanded(index);
    } else {
      setExpanded(null);
    }
  }

  return (

    <ExpansionPanel square expanded={expanded == index}>
      <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" onClick={toggleExpanded}>
        
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >

          <Grid item>
            <Avatar variant="rounded" className={classes.avatarNamespace}>
              <FolderIcon />
            </Avatar>
          </Grid>

          <Grid item>
            <Typography>{namespace.name}</Typography>
          </Grid>

        </Grid>
            
        
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TemplateList>

          { 

            namespace.templates.map((template, index) => {
              return (

                <TemplateItem template={template} />

              )
            })

          }

          <ListItem button>
            <ListItemAvatar>
              <Avatar className={classes.avatarNewTemplate}>
                <AddIcon  />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Add new template"
              
            />
          </ListItem>

        </TemplateList>

      </ExpansionPanelDetails>
    </ExpansionPanel>

  )
}

export default function TemplateSection() {

  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    console.log(panel)
  };

  const handleClick = () => {
    setOpen(true);
  }

  const createNamespace = () => {
    setOpen(false);
  }

  useEffect(() => {
    console.log(expanded);
  },[expanded])

  return (
    <div>

      <Grid container
          direction="row"
          justify="space-between"
          alignItems="center">
          
          <Grid item>
            <Box component="span" m={1}>
              <Typography variant="h5" color="secondary">
                My Templates
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box component="span" m={1}>
              <Typography>
                <IconButton aria-label="save templates" >
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleClick} aria-label="add namespace" >
                  <AddIcon  />
                </IconButton>
              </Typography>
            </Box>

          </Grid>

        </Grid>

      {
        alltemplates.map((namespace, index) => {
          return (
            <TemplatePanel 
              key={index} 
              index={index} 
              namespace={namespace} 
              expanded={expanded} 
              setExpanded={setExpanded} 
              handleChange={handleChange} 
            />
          )
        })
      }
      <NamespaceCreateDialog open={open} setOpen={setOpen} createNamespace={createNamespace} />
    </div>
  );
}

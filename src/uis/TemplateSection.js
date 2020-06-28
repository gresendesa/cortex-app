import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { alltemplates } from '../data/templates';
import NamespaceCreateDialog from './NamespaceCreateDialog';

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

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const TemplatePanel = ({ index, template, expanded, setExpanded, handleChange }) => {
  
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
        <Typography>{template.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
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
              <Typography variant="h5" color="primary">
                My Templates
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box component="span" m={1}>
              <Typography>
                <IconButton onClick={() => {}} aria-label="add namespace" >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Typography>
            </Box>

          </Grid>

        </Grid>

      {
        alltemplates.map((template, index) => {
          return (
            <TemplatePanel 
              key={index} 
              index={index} 
              template={template} 
              expanded={expanded} 
              setExpanded={setExpanded} 
              handleChange={handleChange} 
            />
          )
        })
      }
      <NamespaceCreateDialog open={open} setOpen={setOpen} />
    </div>
  );
}

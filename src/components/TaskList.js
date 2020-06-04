import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ScrollableTabsButtonAuto from './TriggerPackage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TaskList({ tasks }) {
  const classes = useStyles();

  var uiTasks = tasks.map((task, key) => {

    return (

      <ExpansionPanel key={key} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography className={classes.heading}>
          <strong>{ task.name }</strong>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ScrollableTabsButtonAuto opening={task.triggers.opening} main={task.triggers.main} ending={task.triggers.ending} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

    );

  });

  return (
    <div className={classes.root}>

      {uiTasks}
      
    </div>
  );
}

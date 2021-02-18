import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TriggerList from './TriggerList'

import { translateGroupsToIntegers, translateIntegersToGroups } from './utils'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function TriggersSection({ project, task, hookTask, editorMode }) {

  const { setFocus, hasFocus, focus, getFocus } = hookTask();

  let initial_value = 1;
  if((getFocus().task!=null) && (getFocus().task.id==task.id)){
    if(getFocus().group!=null){
      initial_value=translateGroupsToIntegers(getFocus().group);
    }
  }

  //const [myTask, setMyTask] = useState(task);
  const [value, setValue] = useState(initial_value);

  /*useEffect(() => {

  }, [myTask]);*/

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFocus({task, 'group': translateIntegersToGroups(newValue)});
  };

  return (
    <Box>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          centered
        >
          <Tab label="Before" {...a11yProps(0)} dense />
          <Tab label="Loop" {...a11yProps(1)} dense />
          <Tab label="After" {...a11yProps(2)} dense />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TriggerList project={project} group="opening" task={task} hookTask={hookTask} editorMode={editorMode} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TriggerList project={project} group="main" task={task} hookTask={hookTask} editorMode={editorMode} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TriggerList project={project} group="ending" task={task} hookTask={hookTask} editorMode={editorMode} />
      </TabPanel>
    </Box>
  );
}

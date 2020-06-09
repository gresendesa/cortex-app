import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TriggerList from './TriggerList'

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

export default function TriggersSection({ task }) {

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab label="Before" {...a11yProps(0)} />
          <Tab label="Loop" {...a11yProps(1)} />
          <Tab label="After" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TriggerList section="opening" task={task} triggers={task.triggers.opening} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TriggerList section="main" task={task} triggers={task.triggers.main} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TriggerList section="ending" task={task} triggers={task.triggers.ending} />
      </TabPanel>
    </Box>
  );
}

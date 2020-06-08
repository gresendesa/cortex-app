import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TriggerForm from './uis/TriggerForm';
import Avatar from '@material-ui/core/Avatar';
import CodeIcon from '@material-ui/icons/Code';

class Trigger extends React.Component {

	state = {
		...this.props,
		...this.props.trigger
	}

	render(){

		return (
			<ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <CodeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={this.state.name} secondary="trigger" />
              
            </ListItem>
		);

	}

}

export default Trigger;
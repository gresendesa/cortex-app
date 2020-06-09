import React, { makeStyles } from 'react';
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
		...this.props.trigger,
		'openEditor': false
	}

	toggleEditor = () => { 
		this.setState({'openEditor': !this.state.openEditor});
	}

	handleClick = (e) => {
		this.setState({'openEditor': true});
	}

	render(){

		return (
			<React.Fragment>
				<ListItem button onClick={this.handleClick} >
	              <ListItemAvatar>
	                <Avatar>
	                  <CodeIcon />
	                </Avatar>
	              </ListItemAvatar>
	              <ListItemText primary={this.state.name} secondary="trigger" />
	            </ListItem>
	            <TriggerForm taskName={this.props.task.name} trigger={this.state.trigger} open={this.state.openEditor} toggleEditor={this.toggleEditor} />
			</React.Fragment>
		);

	}

}

export default Trigger;
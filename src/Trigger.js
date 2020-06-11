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

	group = this.props.group;

	toggleEditor = () => { 
		this.setState({'openEditor': !this.state.openEditor});
	}

	handleClick = (e) => {
		this.setState({'openEditor': true});
		const { setFocus, getFocus } = this.props.hookTask();
		const { task, group, trigger } = this.props;
		setFocus({ task, group, trigger });
	}

	saveTrigger = (trigger) => {
		
		const task = Object.assign({}, this.props.task);
		const group = this.props.group;
		const editTask = this.props.hookTask().editTask;
		const indexTrigger = task.triggers[group].findIndex(t => {
			return t.id == trigger.id;
		});
		if(indexTrigger>=0){
			task.triggers[group][indexTrigger] = trigger;
			editTask(task);
			this.props.hookTask().alert("saved");
		} else {
			this.props.hookTask().alert("issue");
		}
		
		
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
	            <TriggerForm task={this.props.task} saveTrigger={this.saveTrigger} trigger={this.state.trigger} open={this.state.openEditor} toggleEditor={this.toggleEditor} group={this.group} />
			</React.Fragment>
		);

	}

}

export default Trigger;
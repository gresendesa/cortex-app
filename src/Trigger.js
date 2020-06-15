import React, { makeStyles } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TriggerForm from './uis/TriggerForm';
import Avatar from '@material-ui/core/Avatar';
import CodeIcon from '@material-ui/icons/Code';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

class Trigger extends React.Component {

	state = {
		'trigger': this.props.trigger,
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

	handleMoveUp = () => {
		this.props.moveUp(this.props.trigger);
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
			this.props.hookTask().alert("saved", "success");
			this.setState({'trigger':trigger});
		} else {
			this.props.hookTask().alert("issue");
		}
		
	}

	componentDidMount() {
		const { getFocus } = this.props.hookTask();
		if((getFocus().task != null) && (getFocus().task.id == this.props.task.id)){
			if(getFocus().group == this.props.group){
				if((getFocus().trigger != null) && (getFocus().trigger.id == this.props.trigger.id)){
					this.setState({'openEditor': true});
				}
			}
		}
	}

	render(){

		const { setFocus } = this.props.hookTask();

		return (
			<React.Fragment>
				<ListItem button onClick={this.handleClick} >
					<ListItemAvatar>
						<Avatar>
							<CodeIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={this.state.trigger.name} secondary="action" />
					
					{

						this.props.indice>0 ?
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="move-up" onClick={this.handleMoveUp}>
								<ArrowUpwardIcon />
							</IconButton>
						</ListItemSecondaryAction>
						:
						""

					}
					
	            </ListItem>
	            <TriggerForm task={this.props.task} 
	            			 saveTrigger={this.saveTrigger} 
	            			 trigger={this.state.trigger} 
	            			 open={this.state.openEditor} 
	            			 toggleEditor={this.toggleEditor} 
	            			 group={this.group} 
	            			 setFocus={setFocus} />
			</React.Fragment>
		);

	}

}

export default Trigger;
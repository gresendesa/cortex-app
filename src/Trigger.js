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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';

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

	saveTrigger = (trigger, callback=()=>{}) => {
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
			this.setState({'trigger':trigger}, callback);
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

	toggleActive = () => {

		const { toggleActiveTrigger } = this.props;
		toggleActiveTrigger(this.state.trigger);
		let copyTrigger = Object.assign({}, this.state.trigger);
		copyTrigger.active = !copyTrigger.active;
		this.setState({'trigger': copyTrigger});

	}

	render(){

		const { setFocus, alert } = this.props.hookTask();

		const { launch } = this.props.hookTask();

		const { deleteTrigger } = this.props;

		return (
			<React.Fragment>
				<ListItem button onClick={this.handleClick} >
					<ListItemAvatar>
						<Avatar>
							<CodeIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={
						this.props.trigger.active ?
						this.state.trigger.name
						:
						<strike>{this.state.trigger.name}</strike>
					} secondary="action" />

					
						<ListItemSecondaryAction>

							{
								this.props.indice>0 ?
								<IconButton edge="end" aria-label="move-up" onClick={this.handleMoveUp}>
									<ArrowUpwardIcon size="small" />
								</IconButton>
								:
								""
							}
							{
								this.props.trigger.active ?
								<IconButton edge="end" aria-label="toggle-active" onClick={this.toggleActive}>
									<BlockIcon />
								</IconButton>
								:
								<IconButton edge="end" aria-label="toggle-active" onClick={this.toggleActive}>
									<CheckIcon />
								</IconButton>
							}
							

							<IconButton edge="end" aria-label="delete" onClick={() => deleteTrigger(this.state.trigger)}>
								<DeleteOutlineIcon />
							</IconButton>

						</ListItemSecondaryAction>
								
					
	            </ListItem>
	            <TriggerForm task={this.props.task} 
	            			 saveTrigger={this.saveTrigger} 
	            			 trigger={this.state.trigger} 
	            			 open={this.state.openEditor} 
	            			 toggleEditor={this.toggleEditor} 
	            			 group={this.group} 
	            			 setFocus={setFocus}
	            			 alert={alert}
	            			 launch={launch} />
			</React.Fragment>
		);

	}

}

export default Trigger;
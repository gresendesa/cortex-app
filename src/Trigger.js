import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
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
import DeleteButton from './uis/DeleteButton';
import { deepOrange, green, blueGrey, gray, yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

function TriggerAvatar({ active, blocking }) {
	const useStyles = makeStyles((theme) => ({
	  avatar: {
	    width: theme.spacing(4),
	    height: theme.spacing(4),
	    color: theme.palette.getContrastText(green[500]),
	    backgroundColor: green[500],
	  },
	  avatarBlocking: {
	    width: theme.spacing(4),
	    height: theme.spacing(4),
	    color: theme.palette.getContrastText(yellow[500]),
	    backgroundColor: yellow[500],
	  },
	   avatarInactive: {
	    width: theme.spacing(4),
	    height: theme.spacing(4),
	  },
	}));

	const classes = useStyles();

	return (
		<ListItemAvatar>
			{active && blocking && <Avatar className={classes.avatarBlocking}>
				<CodeIcon />
			</Avatar>}
			{active && !blocking && <Avatar className={classes.avatar}>
				<CodeIcon />
			</Avatar>}
			{!active && <Avatar className={classes.avatarInactive}>
				<CodeIcon />
			</Avatar>}
		</ListItemAvatar>
	)
}

function TypographyCustom({ color, children }) {
	const useStyles = makeStyles((theme) => ({
	  title: {
	    flex: 1,
	    overflow: 'hidden',
	    textOverflow: 'ellipsis',
	    whiteSpace: 'nowrap',
	    maxWidth: '30vw'
	  },
	}));

	const classes = useStyles();

	return (
		<Typography color={color} className={classes.title}>
			{ children }
		</Typography>
	)
}


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
		const { setFocus } = this.props.hookTask();
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
			//this.props.hookTask().alert("saved", "success");
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

		const { setFocus, alert, getActionCode, getTemplateInfo, getDoc } = this.props.hookTask();

		const { deployMacro } = this.props.hookTask();

		const { deleteTrigger } = this.props;

		const opa = 'fdd';

		const HtmlTooltip = withStyles((theme) => ({
		  tooltip: {
		    backgroundColor: '#f5f5f9',
		    color: 'rgba(0, 0, 0, 0.87)',
		    maxWidth: 220,
		    fontSize: theme.typography.pxToRem(12),
		    border: '1px solid #dadde9',
		  },
		}))(Tooltip);

		/*argument: "EVENT"
​​
		id: 0.6855183031923985
		​​
		match: false
		​​
		rule: "fdsafdsa"*/

		console.log(this.props.trigger.events)

		return (
			<React.Fragment>
				<HtmlTooltip title={
					
					this.props.trigger.events.length ?
					<React.Fragment>
						<ul>
						{
							this.props.trigger.events.map((trigger, indice) => {
	              				return (
	              					
									<li>
										
									</li>
									
	              				)
	              			})
						}
						</ul>
					</React.Fragment>
					:
					<b>
					fds
					</b>
					
				} aria-label="events" placement="top">
					<ListItem button onClick={this.handleClick} dense>
						<TriggerAvatar active={this.props.trigger.active} blocking={this.props.trigger.blocking} />
						<ListItemText primary={
							this.props.trigger.active ?
							<TypographyCustom>
								{this.state.trigger.name}
							</TypographyCustom>
							:
							<TypographyCustom color="textSecondary">
								<strike>{this.state.trigger.name}</strike>
							</TypographyCustom>
						} />

						
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
										<BlockIcon size="small" />
									</IconButton>
									:
									<IconButton edge="end" aria-label="toggle-active" onClick={this.toggleActive}>
										<CheckIcon size="small" />
									</IconButton>
								}

								<DeleteButton type='trigger' callback={() => deleteTrigger(this.state.trigger)} />

							</ListItemSecondaryAction>
									
						
		            </ListItem>
	            </HtmlTooltip>
	            <TriggerForm project={this.props.project}
	            			 task={this.props.task} 
	            			 saveTrigger={this.saveTrigger} 
	            			 trigger={this.state.trigger} 
	            			 open={this.state.openEditor} 
	            			 toggleEditor={this.toggleEditor} 
	            			 group={this.group} 
	            			 setFocus={setFocus}
	            			 alert={alert}
	            			 deployMacro={deployMacro}
	            			 active={this.state.trigger.active}
	            			 getActionCode={getActionCode} 
	            			 getTemplateInfo={getTemplateInfo}
	            			 editorMode={this.props.editorMode} 
	            			 getDoc={getDoc}
	            />
			</React.Fragment>
		);

	}

}

export default Trigger;
import React from 'react';
import TasksSection from './uis/TasksSection';
import DependenciesSection from './uis/DependenciesSection';
import TaskCreateDialog from './uis/TaskCreateDialog';
import TaskEditDialog from './uis/TaskEditDialog';
import { DataContext } from './contexts/DataContext';
import { Typography, Box, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { foo } from './mock/processes';
import { macroModel, triggerModel } from './mock/models';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SettingsIcon from '@material-ui/icons/Settings';
import MacroSettings from './uis/MacroSettings';
import { Icon } from 'semantic-ui-react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CodeIcon from '@material-ui/icons/Code';
import BuildPanel from './uis/BuildPanel';
import translateTriggerGroup from './uis/utils';
import { editorThemer } from './uis/utils';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import InlineTriggerEditor from './uis/InlineTriggerEditor';


class Macro extends React.Component {

	state = {
		'openCreateDialog': false,
		'popUpAlert': false,
		'alertMessage': '',
		'focus': {'task':null, 'group':null, 'trigger':null},
		'openConfig': false,
		'devName': 'Federal',
		'deployLoading': false,
		'openBuild': false,
		'buildName': null,
		'build': '',
		'isUserSuper': false,
		'editingTask': null,
	}

	componentWillMount(){
		this.setState({ 'project': this.props.project, ...this.props.project.macro });
	}

	constructor(){
		super();
		this.listRef = React.createRef();
		this.pageY = null;
		this.baselineSignature = null;
	}

	componentDidMount() {
		this.resetDirtyBaseline();
		if (this.props.tabKey && this.props.registerTabSaveHandler) {
			this.props.registerTabSaveHandler(this.props.tabKey, () => {
				return new Promise((resolve) => {
					this.deployMacro({ launch:false, callback:(ok) => resolve(ok) });
				});
			});
		}
		this.syncActions();
	}

	componentWillUnmount() {
		if (this.props.tabKey && this.props.unregisterTabSaveHandler) {
			this.props.unregisterTabSaveHandler(this.props.tabKey);
		}
		if (this.props.onRegisterActions) {
			this.props.onRegisterActions(null);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.deployLoading !== this.state.deployLoading ||
			prevState.tasks !== this.state.tasks ||
			prevState.disabled_tasks !== this.state.disabled_tasks
		) {
			this.syncActions();
		}
		if (!this.props.tabKey || !this.props.setTabDirty) {
			return;
		}

		if (!this.baselineSignature) {
			return;
		}

		const current = this.computeMacroSignature();
		if (current == null) {
			return;
		}

		this.props.setTabDirty(this.props.tabKey, current !== this.baselineSignature);
	}

	computeMacroSignature = () => {
		if (!this.state.project || !this.state.name) {
			return null;
		}

		try {
			return JSON.stringify(macroModel(this.state));
		} catch (e) {
			return null;
		}
	}

	resetDirtyBaseline = () => {
		this.baselineSignature = this.computeMacroSignature();
		if (this.props.tabKey && this.props.setTabDirty) {
			this.props.setTabDirty(this.props.tabKey, false);
		}
	}

	deleteTask = (id) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id !== id;
		});
		this.setState({'tasks':tasks});
	}

	deleteDependencie = (id) => {
		var dependencies = this.state.dependencies.filter(dependencie => {
			return dependencie.id !== id;
		});
		this.setState({'dependencies':dependencies});
	}

	setFocus = ({ task=null, group=null, trigger=null}) => {
		this.setState({'focus': {task, group, trigger}});
	}

	setOpenConfig = (bool) => { 
		this.setState({'openConfig': bool }); 
	}

	getFocus = () => {
		return this.state.focus;
	}

	handleNameChange = (e) => {
		this.setState({'name': e.target.value});
	}

	handlePNameChange = (e) => {
		this.setState({'pname': e.target.value});
	}

	handleDescriptionChange = (e) => {
		this.setState({'description': e.target.value});
	}

	handleEntrypointChange = (e) => {
		this.setState({'entrypoint': e.target.value});
	}

	pushTask = (task) => {
		this.setState({'tasks': [...this.state.tasks, task]})
	}

	pushDependencie = (dependencie) => {
		if(dependencie instanceof Array){
			this.setState({'dependencies': [...this.state.dependencies, ...dependencie]})
		} else {
			this.setState({'dependencies': [...this.state.dependencies, dependencie]})
		}
	}

	hasTask = (task, except=false) => {
		if (except) {
			var filtered_tasks = this.state.tasks.filter(t => t.id !== task.id);
			var result = (filtered_tasks.some(e => e.name == task.name) || filtered_tasks.some(e => e.id == task.id))
		} else {
			var result = (this.state.tasks.some(e => e.name == task.name) || this.state.tasks.some(e => e.id == task.id))
		}
		return result;
	}

	hasDependencie = (dependencie) => {
		const result = (this.state.dependencies.some(e => e.taskName == dependencie.taskName) || this.state.dependencies.some(e => e.id == dependencie.id))
		return result;
	}

	deleteTask = (id, callback) => {
		var tasks = this.state.tasks.filter(task => {
			return task.id != id;
		});
		this.setState({'tasks':tasks}, callback);
	}

	moveTaskUp = (task) => {
		let copyTasks = Object.assign([], this.state.tasks);
		const indice = copyTasks.findIndex(t => {
			return t.id == task.id
		});
		if (indice>0){
			let aboveTask = copyTasks[indice-1];
			copyTasks[indice-1] = task;
			copyTasks[indice] = aboveTask;
			this.setState({'tasks': copyTasks});
		}
	}

	editTask = (task) => {
		const copyTasks = Object.assign([], this.state.tasks);
		const indice = copyTasks.findIndex(t => {
			return t.id == task.id
		});
		copyTasks[indice]=task;
		this.setState({'tasks': copyTasks});
	}

	syncActions = () => {
		if (!this.props.onRegisterActions) return;
		this.props.onRegisterActions({
			onConfig:       () => this.setOpenConfig(true),
			onSave:         () => this.deployMacro({ launch: false }),
			onCode:         () => this.getBuildCode(this.props.project.id),
			onLaunch:       () => this.deployMacro({ launch: true }),
			onAddTask:      () => this.setState({ openCreateDialog: true }),
			onMoveTaskUp:   (task) => this.moveTaskUp(task),
			onToggleTask:   (task) => this.toggleTaskStatus(task),
			onDeleteTask:   (id)   => this.deleteTask(id),
			onEditTask:     (task) => this.openTaskEdit(task),
			onToggleTrigger:  (taskId, group, triggerId) => this.toggleTriggerInState(taskId, group, triggerId),
			onDeleteTrigger:  (taskId, group, triggerId) => this.deleteTriggerInState(taskId, group, triggerId),
			onMoveTriggerUp:  (taskId, group, triggerId) => this.moveTriggerUpInState(taskId, group, triggerId),
			onAddTrigger:     (taskId, group, name)      => this.addTriggerToTask(taskId, group, name),
			onHasTrigger:     (taskId, group, name)      => this.hasTriggerInTask(taskId, group, name),
			loading:        this.state.deployLoading,
			tasks:          this.state.tasks,
			disabledTasks:  this.state.disabled_tasks || [],
		});
	}

	openTaskEdit = (task) => {
		this.setState({ editingTask: task });
	}

	closeTaskEdit = () => {
		this.setState({ editingTask: null });
	}

	saveTriggerAndDeploy = (task, group, newTrigger, { publish }, callback = () => {}) => {
		const copyTask = { ...task };
		const triggers = [...(copyTask.triggers[group] || [])];
		const idx = triggers.findIndex((t) => String(t.id) === String(newTrigger.id));
		if (idx >= 0) {
			triggers[idx] = newTrigger;
			copyTask.triggers = { ...copyTask.triggers, [group]: triggers };
			const copyTasks = [...this.state.tasks];
			const taskIdx = copyTasks.findIndex((t) => String(t.id) === String(copyTask.id));
			if (taskIdx >= 0) copyTasks[taskIdx] = copyTask;
			this.setState({ tasks: copyTasks }, () => {
				this.deployMacro({ launch: publish, callback });
			});
		} else {
			this.deployMacro({ launch: publish, callback });
		}
	}

	toggleTriggerInState = (taskId, group, triggerId) => {
		const copyTasks = [...this.state.tasks];
		const taskIdx = copyTasks.findIndex((t) => String(t.id) === String(taskId));
		if (taskIdx < 0) return;
		const copyTask = { ...copyTasks[taskIdx] };
		const triggers = [...(copyTask.triggers[group] || [])];
		const tIdx = triggers.findIndex((t) => String(t.id) === String(triggerId));
		if (tIdx < 0) return;
		triggers[tIdx] = { ...triggers[tIdx], active: !triggers[tIdx].active };
		copyTask.triggers = { ...copyTask.triggers, [group]: triggers };
		copyTasks[taskIdx] = copyTask;
		this.setState({ tasks: copyTasks });
	}

	deleteTriggerInState = (taskId, group, triggerId) => {
		const copyTasks = [...this.state.tasks];
		const taskIdx = copyTasks.findIndex((t) => String(t.id) === String(taskId));
		if (taskIdx < 0) return;
		const copyTask = { ...copyTasks[taskIdx] };
		const triggers = (copyTask.triggers[group] || []).filter((t) => String(t.id) !== String(triggerId));
		copyTask.triggers = { ...copyTask.triggers, [group]: triggers };
		copyTasks[taskIdx] = copyTask;
		this.setState({ tasks: copyTasks });
	}

	moveTriggerUpInState = (taskId, group, triggerId) => {
		const copyTasks = [...this.state.tasks];
		const taskIdx = copyTasks.findIndex((t) => String(t.id) === String(taskId));
		if (taskIdx < 0) return;
		const copyTask = { ...copyTasks[taskIdx] };
		const triggers = [...(copyTask.triggers[group] || [])];
		const tIdx = triggers.findIndex((t) => String(t.id) === String(triggerId));
		if (tIdx <= 0) return;
		const above = triggers[tIdx - 1];
		triggers[tIdx - 1] = triggers[tIdx];
		triggers[tIdx] = above;
		copyTask.triggers = { ...copyTask.triggers, [group]: triggers };
		copyTasks[taskIdx] = copyTask;
		this.setState({ tasks: copyTasks });
	}

	addTriggerToTask = (taskId, group, name) => {
		const copyTasks = [...this.state.tasks];
		const taskIdx = copyTasks.findIndex((t) => String(t.id) === String(taskId));
		if (taskIdx < 0) return;
		const copyTask = { ...copyTasks[taskIdx] };
		const triggers = [...(copyTask.triggers[group] || [])];
		triggers.push(triggerModel({ name }));
		copyTask.triggers = { ...copyTask.triggers, [group]: triggers };
		copyTasks[taskIdx] = copyTask;
		this.setState({ tasks: copyTasks });
	}

	hasTriggerInTask = (taskId, group, name) => {
		const task = this.state.tasks.find((t) => String(t.id) === String(taskId));
		if (!task) return false;
		return (task.triggers[group] || []).some((t) => t.name === name);
	}

	editTriggerCode = (taskId, group, triggerId, newCode) => {
		const copyTasks = [...this.state.tasks];
		const taskIdx = copyTasks.findIndex((t) => String(t.id) === String(taskId));
		if (taskIdx < 0) return;
		const copyTask = { ...copyTasks[taskIdx] };
		const triggers = [...(copyTask.triggers[group] || [])];
		const triggerIdx = triggers.findIndex((t) => String(t.id) === String(triggerId));
		if (triggerIdx < 0) return;
		triggers[triggerIdx] = { ...triggers[triggerIdx], action: newCode };
		copyTask.triggers = { ...copyTask.triggers, [group]: triggers };
		copyTasks[taskIdx] = copyTask;
		this.setState({ tasks: copyTasks });
	}

	showAlert = (message, severity) => {
		this.setState({'alertMessage': message, 'alertSeverity': severity}, () => {
			this.setState({'popUpAlert':true});
		});
	}

	toggleTaskStatus = (task) => {

		const disabled_tasks = this.state.disabled_tasks

		if(disabled_tasks == undefined){
			//console.log('adicionando pela primeira vez')
			this.setState({'disabled_tasks': [task.name]})
		} else 
		
		if(!disabled_tasks.includes(task.name)){
			//console.log('adicionando')
			this.setState({'disabled_tasks': this.state.disabled_tasks.concat(task.name)})
		} else {
			//console.log('removendo')
			this.setState({'disabled_tasks': this.state.disabled_tasks.filter(t => t != task.name)})
		}
	}

	hookTask = () => {
		return {
			'open': this.state.openCreateDialog, //open flag
			'popUpAlert': this.state.popUpAlert, //open alert toast
			'focus': this.state.focus,
			'toggleCreateDialog': () => { this.setState({'openCreateDialog': !this.state.openCreateDialog }); }, //toggleDialog
			'toggleEditDialog': () => { this.setState({'openEditDialog': !this.state.openEditDialog }); }, //toggleDialog
			'togglePopUpAlert': () => { this.setState({'popUpAlert': !this.state.popUpAlert }); },
			'setOpenConfig': (bool) => { this.setOpenConfig(bool) },
			'pushTask': (task) => { this.pushTask(task) },
			'pushDependencie': (dependencie) => { this.pushDependencie(dependencie) },
			'hasTask': (task, except=false) => { return this.hasTask(task, except) },
			'hasDependencie': this.hasDependencie,
			'deleteTask': (id) => { this.deleteTask(id) },
			'deleteDependencie': this.deleteDependencie,
			'editTask': (task) => { this.editTask(task) },
			'alert': (message, severity="warning") => { this.showAlert(message, severity) },
			'setMacroState': (state, callback=() => {}) => {this.setState(state, callback)},
			'moveTaskUp': (task) => { this.moveTaskUp(task) },
			'setFocus': this.setFocus,
			'hasFocus': this.hasFocus,
			'getFocus': this.getFocus,
			'hasMacroUnsafe': () => { return this.state.unsafe!=null },
			'deployMacro': this.deployMacro,
			'getForeingTask': this.getForeingTask,
			'getForeingTasks': this.getForeingTasks,
			'getActionCode': this.getActionCode,
			'getTemplateInfo': this.props.getTemplateInfo,
			'getDoc': this.props.getDoc,
			'getPublicTemplates': this.props.getPublicTemplates,
			'toggleTaskStatus': this.toggleTaskStatus
		}
	}

	getForeingTask = ({ dev, project, task, success, error }) => {
		this.props.getTask({ dev, project, task, success, error });
	}

	getForeingTasks = ({ dev, project, success, error }) => {
		this.props.getTasks({ dev, project, success, error });
	}

	deployMacro = ({ launch, callback=()=>{} }) => {

		this.setState({'deployLoading': true});

		const macro = macroModel(this.state);
		const success = (response) => {
			this.setState({'deployLoading': false}, () => {
				if (launch){
					this.showAlert(`Launched as ${macro.csid} (${response.project_bytes} bytes)`, "success");
				} else {
					this.showAlert("Saved", "success");
				}
				this.resetDirtyBaseline();
				callback(true);
			});
		}
		const error = (response) => {
			this.setState({'deployLoading': false}, () => {
				this.showAlert(`${response}`, "error");
			});
			callback(false);
		}
		const id = this.state.project.id;

		this.props.saveMacro({ id, macro, launch, success, error });
	}

	setOpenBuild = (value) => {
		this.setState({openBuild: value});
	} 

	getBuildCode = (id, callback=()=>{}) => {

		const success = (response) => {
			this.setState({'deployLoading': false}, () => {
				this.setState({'buildName': this.state.name}, () => {
					this.setState({'build': response.build}, () => {
						this.setState({'openBuild': true}, () => {
							callback(true);
						});
					})
				})
			});
		}
		const error = (response) => {
			this.setState({'deployLoading': false}, () => {
				this.showAlert(`${response}`, "warning");
				callback(false);
			});
		}

		this.setState({'deployLoading': true});
		this.props.getBuild({ id, success, error });
	}

	updateCollaborators = (collaborators, callback) => {
      let copyProject = Object.assign([], this.state.project);
      copyProject.collaborators = collaborators
      this.setState({'project': copyProject}, callback)
    }

	getActionCode = ({ id, name, task_name, section, callback=()=>{} }) => {

		const success = (response) => {
			this.setState({'deployLoading': false}, () => {
				this.setState({'buildName': name + ` • ${task_name} • ${translateTriggerGroup(section)}`}, () => {
					this.setState({'build': response.build}, () => {
						this.setState({'openBuild': true}, () => {
							callback(true);
						});
					})
				});
			});
		}
		const error = (response) => {
			this.setState({'deployLoading': false}, () => {
				this.showAlert(`${response}`, "warning");
				callback(false);
			});
		}

		this.setState({'deployLoading': true});
		this.props.getActionCode({ id, name, project_id:this.state.project.id, task_name, section, success, error });
	}

	renderTriggerEditor = () => {
		const { selectedTrigger } = this.props;
		if (!selectedTrigger) return null;

		const liveTask = this.state.tasks.find((t) => String(t.id) === String(selectedTrigger.task.id));
		if (!liveTask) return null;
		const liveTriggers = (liveTask.triggers && liveTask.triggers[selectedTrigger.group]) || [];
		const liveTrigger = liveTriggers.find((t) => String(t.id) === String(selectedTrigger.trigger.id));
		if (!liveTrigger) return null;

		return (
			<InlineTriggerEditor
				key={`${liveTrigger.id}-${selectedTrigger.group}`}
				project={this.state.project}
				task={liveTask}
				trigger={liveTrigger}
				group={selectedTrigger.group}
				onClose={this.props.onClearSelectedTrigger || (() => {})}
				onSave={(newTrigger, options, cb) => this.saveTriggerAndDeploy(liveTask, selectedTrigger.group, newTrigger, options, cb)}
				onCodeChange={() => {
					if (this.props.tabKey && this.props.setTabDirty) {
						this.props.setTabDirty(this.props.tabKey, true);
					}
				}}
				loading={this.state.deployLoading}
				getActionCode={this.getActionCode}
				getTemplateInfo={this.props.getTemplateInfo}
				getDoc={this.props.getDoc}
				editorMode={this.props.editorMode}
				getPublicTemplates={this.props.getPublicTemplates}
				alert={(msg, sev) => this.showAlert(msg, sev || 'warning')}
			/>
		);
	}

	render(){

		var { open, toggleCreateDialog, togglePopUpAlert, toggleEditDialog, pushTask, hasTask, deleteTask, popUpAlert} = this.hookTask();

		const settings = {
			'name': this.state.name,
			'description': this.state.description,
			'pname': this.state.pname,
			'entrypoint': this.state.entrypoint,
			'endpoint': this.state.endpoint,
			'csid': this.state.csid,
			'unsafe': this.state.unsafe,
			'debug': this.state.debug,
			'production': this.state.production,
			'verbose': this.state.verbose
		}

		//this.setState({ 'isUserSuper': localStorage.getItem('cortex-is-user-super') });


		return (
			<React.Fragment>

				{this.props.selectedTrigger ? (
					this.renderTriggerEditor()
				) : (
					<React.Fragment>
						{this.state.deployLoading && <LinearProgress color="secondary" />}

						<Box mt={2} mb={1} fontWeight="fontWeightMedium" fontFamily="Monospace" fontSize={18} color={'#f50052'}>
							{this.props.project.dev + ' • ' + this.state.name}
						</Box>

						<TasksSection project={this.state.project} disabledTasks={this.state.disabled_tasks} tasks={this.state.tasks} hasDependencies={this.state.dependencies.length} hookTask={this.hookTask} editorMode={this.props.editorMode}/>

						{this.state.editingTask && (
							<TaskEditDialog
								task={this.state.editingTask}
								editTask={this.editTask}
								edit={true}
								setEdit={(val) => { if (!val) this.closeTaskEdit(); }}
								hasTask={this.hasTask}
								alert={(msg, sev) => this.showAlert(msg, sev || 'warning')}
								hasMacroUnsaved={() => this.state.unsafe != null}
							/>
						)}

						<DependenciesSection dependencies={this.state.dependencies} hookTask={this.hookTask} />
					</React.Fragment>
				)}

				<TaskCreateDialog hookTask={this.hookTask}/>

				<Snackbar open={popUpAlert} autoHideDuration={4000} onClose={togglePopUpAlert}>
					<MuiAlert elevation={6} variant="filled" severity={this.state.alertSeverity}>
						{this.state.alertMessage}
					</MuiAlert>
				</Snackbar>

				<BuildPanel open={this.state.openBuild} setOpen={this.setOpenBuild} code={this.state.build} projectName={this.state.buildName} editorMode={this.props.editorMode} theme={editorThemer().loadTheme('trigger')} />

				<MacroSettings openConfig={this.state.openConfig} settings={settings} hookTask={this.hookTask} devName={this.state.devName} project={this.state.project} addCollaborator={this.props.addCollaborator} removeCollaborator={this.props.removeCollaborator} updateCollaborators={this.updateCollaborators} />

			</React.Fragment>
		);

	}

}

export default Macro;
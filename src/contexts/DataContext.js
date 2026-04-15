import React, { createContext, Component } from 'react';
import Server from '../server';

export const DataContext = createContext();

class DataContextProvider extends Component {
	WORKBENCH_TABS_KEY = 'cortex-workbench-tabs';
	WORKBENCH_ACTIVE_TAB_KEY = 'cortex-workbench-active-tab-key';
	tabSaveHandlers = {};
	
	state = {
		'macros': [],
		'token': null,
		'username': null,
		'processing': false,
		'isUserSuper': false,
		'totalRecords': 0,
		'pagination': {
			'page': 1,
			'page_size': 20,
			'total_pages': 0,
			'total_records': 0,
			'has_next': false,
			'has_previous': false,
			'next_page': null,
			'previous_page': null,
			'q': ''
		},
		'workbenchTabs': [],
		'activeWorkbenchTabKey': null,
		'projectDrafts': {}
	}

	version = {
		'number': '1.28',
		'release_date': '11 August 2023',
		'short': 'Devs can use imports of shared projects'
	}

	setToken = (token) => {

		if ((token == 'null') || (token == null)){
			localStorage.removeItem('cortex-token');
			this.setState({'token': null});
		} else {
			localStorage.setItem('cortex-token', token);
			this.setState({'token': token}, () => this.fetchMacros({}));
		}	
	}

	loadWorkbenchTabs = () => {
		try {
			const persistedTabs = localStorage.getItem(this.WORKBENCH_TABS_KEY);
			const persistedActiveTab = localStorage.getItem(this.WORKBENCH_ACTIVE_TAB_KEY);
			const parsedTabs = persistedTabs ? JSON.parse(persistedTabs) : [];

			if (parsedTabs && parsedTabs.length > 0) {
				this.setState({
					workbenchTabs: parsedTabs,
					activeWorkbenchTabKey: persistedActiveTab || parsedTabs[0].key
				});
				return;
			}
		} catch (e) {
			// ignore parse errors and fallback to defaults
		}

		this.setState({
			workbenchTabs: [{ key: 'projects', path: '/projects', label: 'My Projects', closable: false }],
			activeWorkbenchTabKey: 'projects'
		});
	}

	persistWorkbenchTabs = (tabs, activeKey) => {
		localStorage.setItem(this.WORKBENCH_TABS_KEY, JSON.stringify(tabs));
		localStorage.setItem(this.WORKBENCH_ACTIVE_TAB_KEY, activeKey || 'projects');
	}

	setWorkbenchTabDirty = (tabKey, isDirty=true) => {
		if (!tabKey) {
			return;
		}

		this.setState((prevState) => {
			let changed = false;
			const tabs = prevState.workbenchTabs.map((tab) => {
				if (tab.key !== tabKey) {
					return tab;
				}
				if ((tab.isDirty || false) === isDirty) {
					return tab;
				}
				changed = true;
				return {
					...tab,
					isDirty
				};
			});

			if (!changed) {
				return null;
			}

			return { workbenchTabs: tabs };
		}, () => {
			this.persistWorkbenchTabs(this.state.workbenchTabs, this.state.activeWorkbenchTabKey);
		});
	}

	registerWorkbenchTabSaveHandler = (tabKey, handler) => {
		if (!tabKey || typeof handler !== 'function') {
			return;
		}
		this.tabSaveHandlers[tabKey] = handler;
	}

	unregisterWorkbenchTabSaveHandler = (tabKey) => {
		if (!tabKey) {
			return;
		}
		delete this.tabSaveHandlers[tabKey];
	}

	invokeWorkbenchTabSave = async (tabKey) => {
		const handler = this.tabSaveHandlers[tabKey];
		if (!handler) {
			return false;
		}

		try {
			const result = await handler();
			return result !== false;
		} catch (e) {
			return false;
		}
	}

	resolveWorkbenchTab = (pathname) => {
		if (pathname.startsWith('/project/flat/')) {
			const id = pathname.split('/').pop();
			const project = this.state.macros.find((m) => String(m.id) === String(id));
			const name = (project && project.macro && project.macro.name) ? project.macro.name : `Flat ${id}`;
			return {
				key: pathname,
				path: pathname,
				label: name,
				closable: true
			};
		}

		if (pathname.startsWith('/project/')) {
			const id = pathname.split('/').pop();
			const project = this.state.macros.find((m) => String(m.id) === String(id));
			const name = (project && project.macro && project.macro.name) ? project.macro.name : `Project ${id}`;
			return {
				key: pathname,
				path: pathname,
				label: name,
				closable: true
			};
		}

		if (pathname.startsWith('/libs')) {
			return {
				key: 'libs',
				path: '/libs',
				label: 'My Libraries',
				closable: false
			};
		}

		if (pathname.startsWith('/cskey')) {
			return {
				key: 'cskey',
				path: '/cskey',
				label: 'CSKey',
				closable: false
			};
		}

		return {
			key: 'projects',
			path: '/projects',
			label: 'My Projects',
			closable: false
		};
	}

	ensureWorkbenchTab = (pathname) => {
		const incomingTab = this.resolveWorkbenchTab(pathname);
		this.setState((prevState) => {
			const tabs = [...prevState.workbenchTabs];
			const existingIndex = tabs.findIndex((t) => t.key === incomingTab.key);

			if (existingIndex >= 0) {
				tabs[existingIndex] = {
					...tabs[existingIndex],
					...incomingTab
				};
			} else {
				tabs.push({
					...incomingTab,
					isDirty: false
				});
			}

			return {
				workbenchTabs: tabs,
				activeWorkbenchTabKey: incomingTab.key
			};
		}, () => {
			this.persistWorkbenchTabs(this.state.workbenchTabs, this.state.activeWorkbenchTabKey);
		});
	}

	focusWorkbenchTab = (tabKey) => {
		this.setState({ activeWorkbenchTabKey: tabKey }, () => {
			this.persistWorkbenchTabs(this.state.workbenchTabs, this.state.activeWorkbenchTabKey);
		});
	}

	closeWorkbenchTab = ({ tabKey, currentPath, onNavigate=()=>{} }) => {
		let nextPath = currentPath;

		this.setState((prevState) => {
			const tabs = [...prevState.workbenchTabs];
			const tabIndex = tabs.findIndex((t) => t.key === tabKey);

			if (tabIndex < 0 || tabs[tabIndex].closable === false) {
				return null;
			}

			const removedTab = tabs[tabIndex];
			tabs.splice(tabIndex, 1);

			if (tabs.length === 0) {
				tabs.push({ key: 'projects', path: '/projects', label: 'My Projects', closable: false });
			}

			let nextActiveKey = prevState.activeWorkbenchTabKey;
			const isClosingActive = prevState.activeWorkbenchTabKey === tabKey || currentPath === removedTab.path;

			if (isClosingActive) {
				const fallbackIndex = tabIndex > 0 ? tabIndex - 1 : 0;
				nextActiveKey = tabs[fallbackIndex].key;
				nextPath = tabs[fallbackIndex].path;
			}

			return {
				workbenchTabs: tabs,
				activeWorkbenchTabKey: nextActiveKey
			};
		}, () => {
			this.persistWorkbenchTabs(this.state.workbenchTabs, this.state.activeWorkbenchTabKey);
			onNavigate(nextPath);
		});
	}

	setUsername = (username) => {
		if ((username == 'null') || (username == null)){
			localStorage.removeItem('cortex-username');
			this.setState({'username': null});
		} else {
			localStorage.setItem('cortex-username', username);
			this.setState({'username': username});
		}
	}

	setIsUserSuper = (isSuper) => {
		if ((isSuper == 'null') || (isSuper == null)){
			localStorage.removeItem('cortex-is-user-super');
			this.setState({'isUserSuper': false});
		} else {
			localStorage.setItem('cortex-is-user-super', isSuper);
			this.setState({'isUserSuper': isSuper});
		}
	}

	normalizeProject = (project) => {
		if (project && project.macro) {
			return project;
		}

		const safeProject = project || {};
		const macro = {
			name: safeProject.name || '',
			description: safeProject.description || '',
			protocol: safeProject.protocol || 'NONE',
			public: safeProject.public || false
		};

		return {
			id: safeProject.id,
			macro,
			dev: safeProject.dev,
			date: safeProject.date,
			collaborators: safeProject.collaborators || [],
			markdown_description: safeProject.markdown_description || macro.description
		};
	}

	fetchMacros = ({ page=1, pageSize=20, q='', append=false, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			this.setState({'processing': true});
			const onOk = (response) => {
				const normalizedProjects = (response.projects || []).map(this.normalizeProject);
				const projects = append ? [...this.state.macros, ...normalizedProjects] : normalizedProjects;
				const uniqueProjects = [];
				const knownIds = new Set();

				projects.forEach((project) => {
					if (!knownIds.has(project.id)) {
						knownIds.add(project.id);
						uniqueProjects.push(project);
					}
				});

				const pagination = response.pagination || {
					page,
					page_size: pageSize,
					total_pages: 0,
					total_records: response.total_records || 0,
					has_next: false,
					has_previous: page > 1,
					next_page: null,
					previous_page: page > 1 ? page - 1 : null
				};

				this.setState((prevState) => {
					const refreshedTabs = prevState.workbenchTabs.map((tab) => {
						if (tab.key.startsWith('/project/')) {
							const id = tab.key.split('/').pop();
							const project = uniqueProjects.find((m) => String(m.id) === String(id));
							if (project && project.macro && project.macro.name) {
								return { ...tab, label: project.macro.name };
							}
						}
						return tab;
					});
					return {
						'macros': uniqueProjects,
						'totalRecords': response.total_records || pagination.total_records || uniqueProjects.length,
						'pagination': {
							...pagination,
							'q': (response.query && response.query.q !== undefined) ? response.query.q : q
						},
						'workbenchTabs': refreshedTabs
					};
				}, () => {
					this.persistWorkbenchTabs(this.state.workbenchTabs, this.state.activeWorkbenchTabKey);
				});
				success(response);
				this.setIsUserSuper(response.super);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getMacrosPaginated({ success:onOk, error:onIssue, page, pageSize, q })
		} else {
			error("sem token");
		}
	}

	addMacro = ({ macro, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				this.fetchMacros({});
				success(response);
			}
			server.createMacro({ macro, success:onOk, error })
		} else {
			error("sem token");
		}
	}

	getMacro = ({ id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				//remove a versão antiga da macro
				var macros = this.state.macros.map(m => {
					//console.log('update', `${m.id} !== ${id}`, String(m.id) !== String(id))
					if(String(m.id) !== String(id)){
						return m
					}
					return response.project
				})
				//atualiza com a nova versão do servidor
				//macros.unshift(response.project)
				this.setState({'macros': macros}, () => {
					success(response);
					this.setState({'processing': false});
				})
			}
			server.getMacro({ id,success:onOk, error })
		} else {
			error("sem token");
		}
	}

	delMacro = ({ id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				this.fetchMacros({});
				success(response);
			}
			server.deleteMacro({ id, success:onOk, error })
		} else {
			error("sem token");
		}
	}

	saveMacro = ({ id, macro, launch=false, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				//this.fetchMacros({});
				const sucss = (res) => {
					
				}
				const err = () => {
					
				}	
				this.getMacro({ id, sucss, err })
				success(response);
			}

			var current_proj = null
			var macros = this.state.macros.filter(m => {
				if(String(m.id) !== String(id)){
					return true
				}
				current_proj = m
			})
			current_proj.macro = macro
			macros.unshift(current_proj)
			this.setState({'macros': macros})

			server.updateMacro({ id, macro, launch, success:onOk, error })
		} else {
			error("sem token");
		}
	}

	saveLocalMacro = ({ id, macro, launch=false, success=()=>{}, error=()=>{} }) => {
	
		const onOk = (response) => {
			//this.fetchMacros({});
			const sucss = (res) => {
				
			}
			const err = () => {
				
			}	
			//this.getMacro({ id, sucss, err })
			success(response);
		}

		localStorage.setItem('localMacro', JSON.stringify({
			id: id,
			macro: macro
		}));
		onOk('Saved')

	}

	getTask = ({ dev, project, task, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTask({ dev, project, task, success:onOk, error:onIssue })
		} else {
			error("sem token");
		}
	}

	getTasks = ({ dev, project, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTasks({ dev, project, success:onOk, error:onIssue })
		} else {
			error("sem token");
		}
	}

	getBuild = ({ id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.getBuild({ id, success, error })
		} else {
			error("sem token");
		}
	}

	buildLocalCode = ({ macro, success=()=>{}, error=()=>{} }) => {
		//if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.buildLocalCode({ macro, success, error })
		/*} else {
			error("sem token");
		}*/
	}

	getActionCode = ({ id, name, project_id, task_name, section, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.getTriggerBuild({ id, name, project_id, task_name, section, success, error })
		} else {
			error("sem token");
		}
	}

	getTemplateInfo = ({ library, name, project_id=null, success=()=>{}, error=()=>{} }) => {

		//if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTemplateInfo({ library, name, project_id, success: onOk, error: onIssue })
		/*} else {
			error("sem token");
		}*/
	}

	getTemplates = ({ success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getTemplates({ success: onOk, error: onIssue })
		} else {
			error("sem token");
		}
	}

	getPublicTemplates = ({ success=()=>{}, error=()=>{} }) => {

		//if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getPublicTemplates({ success: onOk, error: onIssue })
		/*} else {
			error("sem token");
		}*/
	}

	getDoc = ({ source, type, target, success=()=>{}, error=()=>{} }) => {
		//if(this.state.token!==null){
			this.setState({'processing': true});
			const server = new Server({ token: this.state.token });
			const onOk = (response) => {
				success(response);
				this.setState({'processing': false});
			}
			const onIssue = (response) => {
				error(response);
				this.setState({'processing': false});
			}
			server.getDoc({ source, type, target, success: onOk, error: onIssue })
		/*} else {
			error("sem token");
		}*/
	}

	saveTemplates = ({ templates, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.saveTemplates({ templates, success, error })
		} else {
			error("sem token");
		}
	}

	addCollaborator = ({ project_id, username, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.addCollaborator({ project_id, username, success, error })
		} else {
			error("sem token");
		}
	}

	removeCollaborator = ({ project_id, username, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.removeCollaborator({ project_id, username, success, error })
		} else {
			error("sem token");
		}
	}

	setProjectDraft = (projectId, draftData) => {
		const draft = { ...draftData, timestamp: Date.now() };
		this.setState((prevState) => ({
			projectDrafts: { ...prevState.projectDrafts, [String(projectId)]: draft }
		}));
		try {
			localStorage.setItem(`cortex-draft-${projectId}`, JSON.stringify(draft));
		} catch (e) { /* ignore */ }
	}

	getProjectDraft = (projectId) => {
		const memDraft = this.state.projectDrafts[String(projectId)];
		if (memDraft) return memDraft;
		try {
			const raw = localStorage.getItem(`cortex-draft-${projectId}`);
			if (!raw) return null;
			const draft = JSON.parse(raw);
			if (!draft || !draft.timestamp || (Date.now() - draft.timestamp) > 86400000) {
				localStorage.removeItem(`cortex-draft-${projectId}`);
				return null;
			}
			return draft;
		} catch (e) {
			return null;
		}
	}

	clearProjectDraft = (projectId) => {
		this.setState((prevState) => {
			const drafts = { ...prevState.projectDrafts };
			delete drafts[String(projectId)];
			return { projectDrafts: drafts };
		});
		try {
			localStorage.removeItem(`cortex-draft-${projectId}`);
		} catch (e) { /* ignore */ }
	}

	getCollaborators = ({ project_id, success=()=>{}, error=()=>{} }) => {
		if(this.state.token!==null){
			const server = new Server({ token: this.state.token });
			server.getCollaborators({ project_id, success, error })
		} else {
			error("sem token");
		}
	}

	componentWillMount(){
		this.setToken(localStorage.getItem('cortex-token'));
		this.setUsername(localStorage.getItem('cortex-username'));	
		//this.setIsUserSuper(localStorage.getItem('cortex-is-user-super'));
		this.loadWorkbenchTabs();
	}

	render() {
		return (
			<DataContext.Provider value={{
											...this.state, 
											setToken: this.setToken,
											setUsername: this.setUsername,
											isUserSuper: this.state.isUserSuper,
											fetchMacros: this.fetchMacros,
											getMacro: this.getMacro,
											addMacro: this.addMacro,
											delMacro: this.delMacro,
											saveMacro: this.saveMacro,
											saveLocalMacro: this.saveLocalMacro,
											getTask: this.getTask,
											getTasks: this.getTasks,
											processing: this.state.processing,
											getTemplateInfo: this.getTemplateInfo,
											getPublicTemplates: this.getPublicTemplates,
											getDoc: this.getDoc,
											getBuild: this.getBuild,
											buildLocalCode: this.buildLocalCode,
											getActionCode: this.getActionCode,
											getTemplates: this.getTemplates,
											saveTemplates: this.saveTemplates,
											setIsUserSuper: this.setIsUserSuper,
											version: this.version,
											addCollaborator: this.addCollaborator,
											removeCollaborator: this.removeCollaborator,
											getCollaborators: this.getCollaborators,
											pagination: this.state.pagination,
											workbenchTabs: this.state.workbenchTabs,
											activeWorkbenchTabKey: this.state.activeWorkbenchTabKey,
											ensureWorkbenchTab: this.ensureWorkbenchTab,
											focusWorkbenchTab: this.focusWorkbenchTab,
											closeWorkbenchTab: this.closeWorkbenchTab,
											setWorkbenchTabDirty: this.setWorkbenchTabDirty,
											registerWorkbenchTabSaveHandler: this.registerWorkbenchTabSaveHandler,
											unregisterWorkbenchTabSaveHandler: this.unregisterWorkbenchTabSaveHandler,
										invokeWorkbenchTabSave: this.invokeWorkbenchTabSave,
										setProjectDraft: this.setProjectDraft,
										getProjectDraft: this.getProjectDraft,
										clearProjectDraft: this.clearProjectDraft

										}}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

export default DataContextProvider;
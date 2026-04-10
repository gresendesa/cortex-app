import axios from 'axios';

class Server {

	constructor({ token=null }){
		this.token = token
	}

	getConnection(){
		
		//const url= window.location.href.split('/')[2] === 'localhost' ? 'http://localhost:8000/cortex' : 'https://www.macrosoft.website/cortex';
		const isLocal = window.location.hostname.includes('localhost');
		const localApiPort = window.location.port === '3001' ? '8001' : '8000';
		const localApiUrl = `${window.location.protocol}//${window.location.hostname}:${localApiPort}/cortex`;
		const url = isLocal ? localApiUrl : 'https://www.macrosoft.website/cortex';

		const instance = axios.create({
			baseURL: url
		});


		instance.defaults.headers.post['Content-Type'] = 'application/json';


		if (this.token!==null){
			instance.defaults.headers.common['Authorization'] = `Token ${this.token}`;
		}

		return instance;

	}

	auth({ username, password, success, error }) {

		const conn = this.getConnection({});

		conn.post('/login', {'username': username, 'password': password}).then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})
	
	}

	getCsKey({ username, password, success, error }) {

		const conn = this.getConnection({});

		conn.post('/cs_key', {'username': username, 'password': password}).then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})
	
	}

	getMacrosOLD({ success, error }) {

		const conn = this.getConnection();

		conn.get('/project/getlist').then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})

	}

	getMacros({ success, error, limit }) {

		const conn = this.getConnection();

		conn.get(`/projects/${limit}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})

	}

	getMacrosPaginated({ success, error, page=1, pageSize=20, q='' }) {

		const conn = this.getConnection();

		conn.get('/projects', {
			params: {
				page,
				page_size: pageSize,
				q
			}
		}).then(r => {
			success(r.data)
		}).catch((e) => {
			// Fallback de compatibilidade para servidores antigos sem o endpoint novo.
			if (e && e.response && e.response.status === 404) {
				const fallbackLimit = page * pageSize;
				conn.get(`/projects/${fallbackLimit}`).then((r) => {
					const data = r.data || {};
					const totalRecords = data.total_records || 0;
					const totalPages = pageSize > 0 ? Math.ceil(totalRecords / pageSize) : 0;
					success({
						...data,
						pagination: {
							page,
							page_size: pageSize,
							total_pages: totalPages,
							total_records: totalRecords,
							has_next: page < totalPages,
							has_previous: page > 1,
							next_page: page < totalPages ? page + 1 : null,
							previous_page: page > 1 ? page - 1 : null
						},
						query: {
							q
						}
					});
				}).catch((fallbackError) => {
					error(fallbackError.response || fallbackError);
				});
				return;
			}

			error(e.response || e);
		})

	}

	getMacro({ id, success, error }) {

		const conn = this.getConnection();

		conn.get(`/project/${id}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})

	}

	getTemplates({ success, error }) {

		const conn = this.getConnection();

		conn.get('/templates').then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})

	}


	getPublicTemplates({ success, error }) {

		const conn = this.getConnection();

		conn.get('/templates/public').then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})

	}

	saveTemplates({ templates, success, error }) {

		const conn = this.getConnection();

		conn.post('/templates', templates).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})

	}

	createMacro({ macro, success, error }) {

		const conn = this.getConnection();

		conn.post('/project/create', { macro }).then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})
	
	}

	deleteMacro({ id, success, error }) {

		const conn = this.getConnection();

		conn.delete(`/project/delete/${id}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})
	
	}

	updateMacro({ id, macro, launch, success, error }) {

		const conn = this.getConnection();

		conn.put(`/project/save/${id}`, { launch, macro }).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getTask({ dev, project, task, success, error }) {

		const conn = this.getConnection();

		conn.get(`/task/getinfo/${dev}/${project}/${task}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getTasks({ dev, project, success, error }) {

		const conn = this.getConnection();

		conn.get(`/tasks/${dev}/${project}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getBuild({ id, success, error }) {

		const conn = this.getConnection();

		conn.get(`/project/build/get/${id}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	buildLocalCode({ macro, success, error }) {

		const conn = this.getConnection();

		conn.post(`/project/buildlocalcode`, macro).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getTemplateInfo({ library, name, project_id, success, error }) {

		const conn = this.getConnection();

		var url = `template/details/${library}/${name}`;
		if(project_id!==null){
			url = `template/details/${library}/${name}/${project_id}`;
		}

		conn.get(url).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getDoc({ source, type, target, success, error }) {

		const conn = this.getConnection();

		conn.get(`doc/${source}/${type}/${target}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getTriggerBuild({ id, name, project_id, task_name, section, success, error }) {

		const conn = this.getConnection();

		conn.get(`/trigger/build/get/${id}/${name}/project/${project_id}/task/${task_name}/section/${section}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	addCollaborator({ project_id, username, success, error }) {
		const conn = this.getConnection();

		conn.post(`/project/${project_id}/collaborator/${username}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	removeCollaborator({ project_id, username, success, error }) {
		const conn = this.getConnection();

		conn.delete(`/project/${project_id}/collaborator/${username}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	removeCollaborator({ project_id, username, success, error }) {
		const conn = this.getConnection();

		conn.delete(`/project/${project_id}/collaborator/${username}`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

	getCollaborators({ project_id, success, error }) {
		const conn = this.getConnection();

		conn.delete(`/project/${project_id}/collaborators`).then(r => {
			success(r.data)
		}).catch(function(e) {
			try {
				error(e.response.data.detail);
			} catch {
				error(e.message);
			}
		})
	}

}

export default Server;
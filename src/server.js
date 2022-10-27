import axios from 'axios';

class Server {

	constructor({ token=null }){
		this.token = token
	}

	getConnection(){
		
		//const url= window.location.href.split('/')[2] === 'localhost:3000' ? 'http://localhost:8000/cortex' : 'https://webmacrosoft.herokuapp.com/cortex';
		const url= window.location.href.split('/')[2] === 'http://web/cortex';

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
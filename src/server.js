import axios from 'axios';

class Server {

	constructor({ token=null }){
		this.token = token
	}

	getConnection(){
		
		const url= window.location.href.split('/')[2] === 'localhost:3000' ? 'http://localhost:8000/cortex' : 'https://webmacrosoft.herokuapp.com/cortex';

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

	getMacros({ success, error }) {

		const conn = this.getConnection();

		conn.get('/project/getlist').then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
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
			error(e.message);
		})
	}

}

export default Server;
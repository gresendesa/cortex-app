import axios from 'axios';

class Server {

	constructor({ token=null }){
		this.token = token
	}

	getConnection({ url='http://localhost:8000/cortex', method='POST' }){
		
		const instance = axios.create({
			baseURL: url
		});

		if (method!=='GET'){
			instance.defaults.headers.post['Content-Type'] = 'application/json';
		}

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

		const conn = this.getConnection({});

		conn.get('/project/getlist').then(r => {
			success(r.data)
		}).catch(function(e) {
			error(e.response);
		})
	
	}

}

export default Server;
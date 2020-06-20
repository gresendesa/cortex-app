import axios from 'axios';

class Server {

	constructor({ token=null }){
		this.token = token
	}

	getConnection({ path='/', url='http://localhost:8000/cortex', method='POST', token=this.token, data={} }){
		
	}

	auth() {

	
	}

}

export default Server;
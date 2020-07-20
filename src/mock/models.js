export function taskModel({ name, description='', id=Math.random(), delay=1, unsafe=100, visible=false }){
	return {
		'name': name, 
		'id':id,
		'delay':delay, 
		'unsafe':unsafe,
		'visible':visible,
		'description': description,
		'triggers': {
			'opening': [],
			'main': [],
			'ending': []
		}
	}
}

export function triggerModel({ name, id=Math.random(), blocking=false, action='', events=[], active=true }){
	return {
		"name": name,
		"id": id,
		"blocking": blocking,
		"events": events,
		"action": action,
		"active": active
	}
}

export function eventModel({ argument="", rule="", match=false, id=Math.random() }){
	return {
		"id": id,
		"argument": argument,
		"rule": rule,
		"match": match,
	}
}

export function dependencieModel({ dev, project, taskName, id=Math.random() }){
	return {
		id,
		dev,
		project,
		taskName
	}
}

export function namespaceModel({ name, description, visible=false, id=Math.random(), templates=[] }){
	return {
		id,
		name,
		description,
		visible,
		templates
	}
}

export function templateModel({ name, description, code='', id=Math.random() }){
	return {
		id,
		name,
		description,
		code
	}
}

export function macroModel({ name, description, debug=false, production=true, csid, pname, entrypoint, endpoint='', unsafe=null, dependencies=[], tasks, verbose=true }){
	return {
		'name': name,
		'description': description,
		'debug': debug,
		'production': production,
		'inner-protocol': 'TASK',
		'protocol': 'CTRL',
		'csid': csid,
		'pname': pname,
		'entrypoint': entrypoint,
		'endpoint': endpoint,
		'unsafe': unsafe,
		'dependencies': dependencies,
		'tasks': tasks,
		'verbose': verbose
	}
}


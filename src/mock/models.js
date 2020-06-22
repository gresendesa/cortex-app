export function taskModel({ name, id=Math.random(), delay=1, unsafe=100 }){
	return {
		'name': name, 
		'id':id,
		'delay':delay, 
		'unsafe':unsafe,
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
		"id":id,
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

export function dependencieModel({ dev, project, taskName }){
	return {
		dev,
		project,
		taskName
	}
}

export function macroModel({ name, description, debug=false, production=true, csid, pname, entrypoint, unsafe=null, dependencies=[], tasks }){
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
		'unsafe': unsafe,
		'dependencies': dependencies,
		'tasks': tasks,
	}
}


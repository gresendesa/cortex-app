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

export function triggerModel({ name, id=Math.random(), blocking=false, action='', events=[] }){
	return {
		"name": name,
		"id":id,
		"blocking": blocking,
		"events": events,
		"action": action
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
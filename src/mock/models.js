import { v1 as uuidv1 }  from 'uuid';


export function taskModel({ name, id=uuidv1(), delay=1, unsafe=100 }){
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

export function triggerModel({ name, id=uuidv1(), blocking=false, action='', events=[] }){
	return {
		"name": name,
		"id":id,
		"blocking": blocking,
		"events": events,
		"action": action
	}
}

export function eventModel({ argument="", rule="", match=false, id=uuidv1() }){
	return {
		"id": id,
		"argument": argument,
		"rule": rule,
		"match": match,
	}
}
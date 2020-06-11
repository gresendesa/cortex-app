import { v1 as uuidv1 }  from 'uuid';


export function taskModel({ name, delay=1, unsafe=100 }){
	return {
		'name': name, 
		'id':uuidv1(),
		'delay':delay, 
		'unsafe':unsafe,
		'triggers': {
			'opening': [],
			'main': [],
			'ending': []
		}
	}
}

export function triggerModel({ name, blocking=false, action='', events=[] }){
	return {
		"name": name,
		"id":uuidv1(),
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
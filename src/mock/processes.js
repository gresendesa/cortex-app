export const foo = {

	"name": "Foo",
	"description": "Foo process",
	"debug": false,
	"production": false,
	"inner-protocol": "TASK",
	"protocol": "CTRL",
	"pname": "guiga",
	"entrypoint": "main",
	"unsafe": null,
	"dependencies": [
		"macrosoft.traps>=2.0"
	],
	"tasks": [
		{
			"name": "main",
			"id":Math.random(),
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening": [
					{
						"name": "trigger1",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"id":Math.random(),
								"argument": "",
								"rule": 1,
								"match": false
							}
						],
						"action": "LOG(\"%&task__%\");"
					}
				],
				"main": [
					{
						"name": "trigger2",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"id":Math.random(),
								"argument": "PITCH",
								"rule": ">60",
								"match": false
							},
						],
						"action": "LOG(\"OK (%&args__[1]%), teste1 %#loop__%\");\nSET(&foo,\"foo\");SET(&transition_,\"jump baz(abc,001,coisas,a,b,c,d,e,f,g,h,i,j)\");SET(interrupt_);"
					}
				],
				"ending": [
					{
						"name": "trigger3",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"id":Math.random(),
								"argument": "",
								"rule": 1,
								"match": false
							}
						],
						"action": "LOG(\"saindo da task\");"
					}
				]
			}
		},


		{
			"name": "baz",
			"id":Math.random(),
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening": [
					{
						"name": "trigger4",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"id":Math.random(),
								"argument": "",
								"rule": 1,
								"match": false
							},
							{
								"id":Math.random(),
								"argument": "PLAYER",
								"rule": "^Federal$",
								"match": true
							}
						],
						"action": "LOG(\"%&task__%\");"
					}
				],
				"main": [
					{
						"name": "trigger5",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"id":Math.random(),
								"argument": "PITCH",
								"rule": "<60",
								"match": false
							}
						],
						"action": "LOG(\"OK, baz\");SET(&transition_,\"jump main()\");SET(interrupt_);"
					},
					{
						"name": "trigger6",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"id":Math.random(),
								"argument": "PITCH",
								"rule": "<30",
								"match": false
							}
						],
						"action": "LOG(\"OK, baz, calling\");SET(&transition_,\"call def() => main({$})\");SET(interrupt_);"
					}
				],
				"ending": []
			}
		},



		{
			"name": "def",
			"id":Math.random(),
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening": [
					{
						"name": "trigger7",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"argument": "",
								"rule": 1,
								"match": false
							}
						],
						"action": "LOG(\"%&task__%\");"
					}
				],
				"main": [
					{
						"name": "trigger8",
						"id":Math.random(),
						"blocking": false,
						"events": [
							{
								"argument": "",
								"rule": "1",
								"match": false,
							}
						],
						"action": "LOG(\"OK, baz\");SET(&transition_,\"return 67\");SET(interrupt_);"
					}
				],
				"ending": []
			}
		}
	]

}

var foo2 = {

	"name": "Foo",
	"description": "Foo process",
	"debug": false,
	"production": false,
	"inner-protocol": "TASK",
	"protocol": "CTRL",
	"pname": "guiga",
	"entrypoint": "main",
	"unsafe": null,
	"dependencies": [
		"macrosoft.traps>=2.0"
	],
	"tasks": [
		{
			"name": "trt", 
			"id":"123a",
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening":[
					{"name":"oba0", "id":"abc0", "content":"tey0"},
					{"name":"oba1", "id":"abc1", "content":"tey1"},
				],
				"main":[
					{"name":"oba2", "id":"abc2", "content":"tey2"},
					{"name":"oba3", "id":"abc3", "content":"tey3"},
					{"name":"oba4", "id":"abc4", "content":"tey4"},
				],
				"ending":[
					{"name":"oba5", "id":"abc5", "content":"tey5"},
					{"name":"oba6", "id":"abc6", "content":"tey6"},
					{"name":"oba7", "id":"abc7", "content":"tey7"},
					{"name":"oba8", "id":"abc8", "content":"tey8"},
				]
			}
		},
		{
			"name": "bro", 
			"id":"123b",
			"delay": 2,
			"unsafe": 200,
			"triggers": {
				"opening":[
					{"name":"oba0", "id":"abc0", "content":"tey0"},
					{"name":"oba1", "id":"abc1", "content":"tey1"},
				],
				"main":[
					{"name":"oba2", "id":"abc2", "content":"tey2"},
					{"name":"oba3", "id":"abc3", "content":"tey3"},
					{"name":"oba4", "id":"abc4", "content":"tey4"},
				],
				"ending":[
					{"name":"oba5", "id":"abc5", "content":"tey5"},
					{"name":"oba6", "id":"abc6", "content":"tey6"},
					{"name":"oba7", "id":"abc7", "content":"tey7"},
					{"name":"oba8", "id":"abc8", "content":"tey8"},
				]
			}
		},
	]
};
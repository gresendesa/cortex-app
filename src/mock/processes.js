export const foo = {

	"name": "Foo",
	"description": "Foo process",
	"debug": false,
	"production": false,
	"inner-protocol": "TASK",
	"csid": "mais-yo",
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
						"action": "LOG(\"%&task__%\");",
						"active": true
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
						"action": "LOG(\"OK (%&args__[1]%), teste1 %#loop__%\");\nSET(&foo,\"foo\");SET(&transition_,\"jump baz(abc,001,coisas,a,b,c,d,e,f,g,h,i,j)\");SET(interrupt_);",
						"active": true
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
						"action": "LOG(\"saindo da task\");",
						"active": true
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
						"action": "LOG(\"%&task__%\");",
						"active": true
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
						"action": "LOG(\"OK, baz\");SET(&transition_,\"jump main()\");SET(interrupt_);",
						"active": true
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
						"action": "LOG(\"OK, baz, calling\");SET(&transition_,\"call def() => main({$})\");SET(interrupt_);",
						"active": true
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
						"action": "LOG(\"%&task__%\");",
						"active": true
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
						"action": "LOG(\"OK, baz\");SET(&transition_,\"return 67\");SET(interrupt_);",
						"active": true
					}
				],
				"ending": []
			}
		}
	]

}


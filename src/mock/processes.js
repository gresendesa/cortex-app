export var foo = {

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
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening": [
					{
						"name": "trigger1",
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
						"name": "trigger2",
						"blocking": false,
						"events": [
							{
								"argument": "PITCH",
								"rule": ">60",
								"match": false
							}
						],
						"action": "LOG(\"OK (%&args__[1]%), teste1 %#loop__%\");\nSET(&foo,\"foo\");SET(&transition_,\"jump baz(abc,001,coisas,a,b,c,d,e,f,g,h,i,j)\");SET(interrupt_);"
					}
				],
				"ending": [
					{
						"name": "trigger3",
						"blocking": false,
						"events": [
							{
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
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening": [
					{
						"name": "trigger4",
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
						"name": "trigger5",
						"blocking": false,
						"events": [
							{
								"argument": "PITCH",
								"rule": "<60",
								"match": false
							}
						],
						"action": "LOG(\"OK, baz\");SET(&transition_,\"jump main()\");SET(interrupt_);"
					},
					{
						"name": "trigger6",
						"blocking": false,
						"events": [
							{
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
			"delay": 1,
			"unsafe": 100,
			"triggers": {
				"opening": [
					{
						"name": "trigger7",
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
						"blocking": false,
						"events": [
							{
								"argument": "",
								"rule": "1",
								"match": false
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
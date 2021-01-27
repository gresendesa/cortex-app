import 'brace/mode/java';

export class CustomHighlightRules extends window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules {
	constructor(options) {
		super();
		
		var oop = window.ace.acequire("ace/lib/oop");
		var TextHighlightRules = window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules;

		var JavaScriptHighlightRules = window.ace.acequire("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules;

		var DocCommentHighlightRules = function() {
		    this.$rules = {
		        "start" : [ {
		            token : "comment.doc.tag",
		            regex : "@[\\w\\d_]+" // TODO: fix email addresses
		        }, 
		        DocCommentHighlightRules.getTagRule(),
		        {
		            defaultToken : "comment.doc",
		            caseInsensitive: true
		        }]
		    };
		};

		oop.inherits(DocCommentHighlightRules, TextHighlightRules);

		DocCommentHighlightRules.getTagRule = function(start) {
		    return {
		        token : "comment.doc.tag.storage.type",
		        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
		    };
		};

		DocCommentHighlightRules.getStartRule = function(start) {
		    return {
		        token : "comment.doc", // doc comment
		        regex : "\\/\\*(?=\\*)",
		        next  : start
		    };
		};

		DocCommentHighlightRules.getEndRule = function (start) {
		    return {
		        token : "comment.doc", // closing comment
		        regex : "\\*\\/",
		        next  : start
		    };
		};


		function comments(next) {
		    return [
		        {
		            token : "comment", // multi line comment
		            regex : /\/\*/,
		            next: [
		                DocCommentHighlightRules.getTagRule(),
		                {token : "comment", regex : "\\*\\/", next : next || "pop"},
		                {defaultToken : "comment", caseInsensitive: true}
		            ]
		        }, {
		            token : "comment",
		            regex : "\\/\\/",
		            next: [
		                DocCommentHighlightRules.getTagRule(),
		                {token : "comment", regex : "$|^", next : next || "pop"},
		                {defaultToken : "comment", caseInsensitive: true}
		            ]
		        }
		    ];
		}

		var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";

		var keywordMapper = this.createKeywordMapper({
	        "variable.language":
	            
	            "ALT|AMBIENTVOLUME|"                                                                        +
	            "ARMOUR|ATTACKPOWER|ATTACKSPEED|BIOME|BLOCKVOLUME|BOOTSDAMAGE|BOOTSDURABILITY|"             +
	            "BOOTSID|BOOTSNAME|BOWCHARGE|CAMERA|CANFLY|CARDINALYAW|CHESTPLATEDAMAGE|"                   +
	            "CHESTPLATEDURABILITY|CHESTPLATEID|CHESTPLATENAME|CHUNKUPDATES|CONFIG|"                     +
	            "CONTAINERSLOTS|COOLDOWN|CTRL|DATE|DATETIME|DAY|DAYTICKS|DAYTIME|DIFFICULTY|"               +
	            "DIMENSION|DIRECTION|DISPLAYHEIGHT|DISPLAYNAME|DISPLAYWIDTH|DURABILITY|FLYING|"             +
	            "FOV|FPS|GAMEMODE|GAMMA|GUI|HEALTH|HELMDAMAGE|HELMDURABILITY|HELMID|HELMNAME|"              +
	            "HIT|HITDATA|HITID|HITNAME|HITPROGRESS|HITSIDE|HITUUID|HITX|HITY|"               			+
	            "HITZ|HOSTILEVOLUME|HUNGER|INVSLOT|ITEM|ITEMCODE|ITEMDAMAGE|ITEMIDDMG|ITEMNAME|"            +
	            "ITEMUSEPCT|ITEMUSETICKS|KEYID|KEYNAME|LEGGINGSDAMAGE|LEGGINGSDURABILITY|"  				+
	            "LEGGINGSID|LEGGINGSNAME|LEVEL|LIGHT|LMOUSE|LOCALDIFFICULTY|MAXPLAYERS|MIDDLEMOUSE"         +
	            "|MODE|MUSIC|NEUTRALVOLUME|OFFHANDCOOLDOWN|OFFHANDDURABILITY|OFFHANDITEM|OFFHANDITEMCODE|"  +
	            "OFFHANDITEMDAMAGE|OFFHANDITEMIDDMG|OFFHANDITEMNAME|OFFHANDSTACKSIZE|ONLINEPLAYERS|"        +
	            "OXYGEN|PITCH|PLAYER|PLAYERVOLUME|RAIN|RECORDVOLUME|RESOURCEPACKS[]|RMOUSE|SATURATION|"     +
	            "SCREEN|SCREENNAME|SEED|SENSITIVITY|SERVER|SERVERMOTD|SERVERNAME|SHADERGROUP|"              +
	            "SHADERGROUPS[]|SHIFT|SIGNTEXT[]|SOUND|STACKSIZE|TICKS|TIME|TIMESTAMP|TOTALTICKS|"          +
	            "TOTALXP|UNIQUEID|UUID|VEHICLE|VEHICLEHEALTH|WEATHERVOLUME|XP|XPOS|XPOSF|YAW|YPOS|"         +
	            "YPOSF|ZPOS|ZPOSF|"                                                                         +

	            "KEY_0|KEY_1|KEY_2|KEY_3|KEY_4|KEY_5|KEY_6|KEY_7|KEY_8|KEY_9|KEY_A|KEY_ADD|"                +
	            "KEY_APOSTROPHE|KEY_APPS|KEY_AT|KEY_AX|KEY_B|KEY_BACK|KEY_BACKSLASH|KEY_C|"                 +
	            "KEY_CAPITAL|KEY_CIRCUMFLEX|KEY_CLEAR|KEY_COLON|KEY_COMMA|KEY_CONVERT|KEY_D|"               +
	            "KEY_DECIMAL|KEY_DELETE|KEY_DIVIDE|KEY_DOWN|KEY_E|KEY_END|KEY_EQUALS|KEY_ESCAPE|"           +
	            "KEY_F|KEY_F1|KEY_F10|KEY_F11|KEY_F12|KEY_F13|KEY_F14|KEY_F15|KEY_F16|KEY_F17|"             +
	            "KEY_F18|KEY_F19|KEY_F2|KEY_F3|KEY_F4|KEY_F5|KEY_F6|KEY_F7|KEY_F8|KEY_F9|"                  +
	            "KEY_FUNCTION|KEY_G|KEY_GRAVE|KEY_H|KEY_HOME|KEY_I|KEY_INSERT|KEY_J|KEY_K|"                 +
	            "KEY_KANA|KEY_KANJI|KEY_L|KEY_LBRACKET|KEY_LCONTROL|KEY_LEFT|KEY_LMENU|"                    +
	            "KEY_LMETA|KEY_LSHIFT|KEY_M|KEY_MINUS|KEY_MOUSE3|KEY_MOUSE4|KEY_MULTIPLY|KEY_N|"            +
	            "KEY_NEXT|KEY_NOCONVERT|KEY_NONE|KEY_NUMLOCK|KEY_NUMPAD0|KEY_NUMPAD1|"                      +
	            "KEY_NUMPAD2|KEY_NUMPAD3|KEY_NUMPAD4|KEY_NUMPAD5|KEY_NUMPAD6|KEY_NUMPAD7|"                  +
	            "KEY_NUMPAD8|KEY_NUMPAD9|KEY_NUMPADCOMMA|KEY_NUMPADENTER|KEY_NUMPADEQUALS|"                 +
	            "KEY_O|KEY_P|KEY_PAUSE|KEY_PERIOD|KEY_POWER|KEY_PRIOR|KEY_Q|KEY_R|KEY_RBRACKET|"            +
	            "KEY_RCONTROL|KEY_RETURN|KEY_RIGHT|KEY_RMENU|KEY_RMETA|KEY_RSHIFT|KEY_S|"                   +
	            "KEY_SCROLL|KEY_SECTION|KEY_SEMICOLON|KEY_SLASH|KEY_SLEEP|KEY_SPACE|KEY_STOP|"              +
	            "KEY_SUBTRACT|KEY_SYSRQ|KEY_T|KEY_TAB|KEY_U|KEY_UNDERLINE|KEY_UNLABELED|KEY_UP|"            +
	            "KEY_V|KEY_W|KEY_X|KEY_Y|KEY_YEN|KEY_Z"														+

	            "LANG",																						

	        "keyword":
	            "arraysize|bind|bindgui|break|calcyawto|camera|chatfilter|chatheight|"          +
	            "chatheightfocused|chatopacity|chatscale|chatvisible|chatwidth|clearchat|"      +
	            "clearcrafting|config|craft|craftandwait|dec|decode|disconnect|do|echo|"        +
	            "else|elseif|encode|exec|filter|fog|for|foreach|fov|gamma|getid|getidrel|"      +
	            "getiteminfo|getproperty|getslot|getslotitem|gui|if|ifbeginswith|ifcontains|"   +
	            "ifendswith|ifmatches|iif|import|inc|indexof|inventorydown|inventoryup|"        +
	            "isrunning|join|key|keydown|keyup|lcase|log|lograw|logto|look|looks|match|"     +
	            "modify|music|pass|pick|placesign|playsound|pop|popupmessage|press|prompt|"     +
	            "push|put|random|regexreplace|reloadresources|repl|replace|resourcepacks|"      +
	            "respawn|sensitivity|set|setlabel|setproperty|setres|setslotitem|shadergroup|"  +
	            "showgui|slot|slotclick|split|sprint|sqrt|stop|store|storeover|strip|time|"     +
	            "title|toast|toggle|togglekey|trace|type|ucase|unimport|unsafe|unset|unsprint|" +
	            "until|volume|wait|while|"                                                      +
	            "endif|next|loop|endunsafe|"                                                    +
	            "run|centralize|getchestname|getfishhook|chat|"                                 + //Bezouro commands

	            "ARRAYSIZE|BIND|BINDGUI|BREAK|CALCYAWTO|CAMERA|CHATFILTER|CHATHEIGHT|"          +
	            "CHATHEIGHTFOCUSED|CHATOPACITY|CHATSCALE|CHATVISIBLE|CHATWIDTH|CLEARCHAT|"      +
	            "CLEARCRAFTING|CONFIG|CRAFT|CRAFTANDWAIT|DEC|DECODE|DISCONNECT|DO|ECHO|"        +
	            "ELSE|ELSEIF|ENCODE|EXEC|FILTER|FOG|FOR|FOREACH|FOV|GAMMA|GETID|GETIDREL|"      +
	            "GETITEMINFO|GETPROPERTY|GETSLOT|GETSLOTITEM|GUI|IF|IFBEGINSWITH|IFCONTAINS|"   +
	            "IFENDSWITH|IFMATCHES|IIF|IMPORT|INC|INDEXOF|INVENTORYDOWN|INVENTORYUP|"        +
	            "ISRUNNING|JOIN|KEY|KEYDOWN|KEYUP|LCASE|LOG|LOGRAW|LOGTO|LOOK|LOOKS|MATCH|"     +
	            "MODIFY|MUSIC|PASS|PICK|PLACESIGN|PLAYSOUND|POP|POPUPMESSAGE|PRESS|PROMPT|"     +
	            "PUSH|PUT|RANDOM|REGEXREPLACE|RELOADRESOURCES|REPL|REPLACE|RESOURCEPACKS|"      +
	            "RESPAWN|SENSITIVITY|SET|SETLABEL|SETPROPERTY|SETRES|SETSLOTITEM|SHADERGROUP|"  +
	            "SHOWGUI|SLOT|SLOTCLICK|SPLIT|SPRINT|SQRT|STOP|STORE|STOREOVER|STRIP|TIME|"     +
	            "TITLE|TOAST|TOGGLE|TOGGLEKEY|TRACE|TYPE|UCASE|UNIMPORT|UNSAFE|UNSET|UNSPRINT|" +
	            "UNTIL|VOLUME|WAIT|WHILE|"                                                      +
	            "ENDIF|NEXT|LOOP|ENDUNSAFE|"                                                    +

	            "jump|call|return|"																+

	            "HTTPREQUEST|httprequest|"                                                      + //Federal commands

	            "import|extends|macro|include", //Cortex templates call
	        "storage.type":
	            "const|let|var|function",
	        "constant.language":
	            "build|ms|t|\$\$",
	        "support.function":
	            "alert",
	        "constant.language.boolean": "true|false|True|False"
	    }, "identifier");

		var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";

	    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
	        "u[0-9a-fA-F]{4}|" + // unicode
	        "u{[0-9a-fA-F]{1,6}}|" + // es6 unicode
	        "[0-2][0-7]{0,2}|" + // oct
	        "3[0-7][0-7]?|" + // oct
	        "[4-7][0-7]?|" + //oct
	        ".)";

		this.$rules = {
	        "no_regex" : [
	            DocCommentHighlightRules.getStartRule("doc-start"),
	            comments("no_regex"),
	            {
	                token : "string",
	                regex : "'(?=.)",
	                next  : "qstring"
	            }, {
	                token : "string",
	                regex : '"(?=.)',
	                next  : "qqstring"
	            }, {
	                token : "constant.numeric", // hexadecimal, octal and binary
	                regex : /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
	            }, {
	                token : "constant.numeric", // decimal integers and floats
	                regex : /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "support.function",
	                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "entity.name.function", "text",
	                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
	                    "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "entity.name.function", "text",
	                    "keyword.operator", "text",
	                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
	                ],
	                regex : "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "entity.name.function", "text", "punctuation.operator",
	                    "text", "storage.type", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "text", "text", "storage.type", "text", "paren.lparen"
	                ],
	                regex : "(:)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : "keyword",
	                regex : "from(?=\\s*('|\"))"
	            }, {
	                token : "keyword",
	                regex : "(?:" + kwBeforeRe + ")\\b",
	                next : "start"
	            }, {
	                token : ["support.constant"],
	                regex : /that\b/
	            }, {
	                token : ["storage.type", "punctuation.operator", "support.function.firebug"],
	                regex : /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
	            }, {
	                token : keywordMapper,
	                regex : identifierRe
	            }, {
	                token : "punctuation.operator",
	                regex : /[.](?![.])/,
	                next  : "property"
	            }, {
	                token : "storage.type",
	                regex : /=>/,
	                next  : "start"
	            },{
		            token : function(value) {
		                if(value.match(/^([&#@][a-zA-Z_\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*|self|parent)$/))
		                    return "variable";
		                else
		                    return "identifier";
		            },
		            regex : /[a-zA-Z_&#@\x7f-\uffff][a-zA-Z0-9_\x7f-\uffff]*/
		        },{
	                token : "keyword.operator",
	                regex : /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
	                next  : "start"
	            }, {
	                token : "punctuation.operator",
	                regex : /[?:,;.]/,
	                next  : "start"
	            }, {
	                token : "paren.lparen",
	                regex : /[\[({]/,
	                next  : "start"
	            }, {
	                token : "paren.rparen",
	                regex : /[\])}]/
	            }, {
	                token: "comment",
	                regex: /^#!.*$/
	            }
	        ],
	        property: [{
	                token : "text",
	                regex : "\\s+"
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "entity.name.function", "text",
	                    "keyword.operator", "text",
	                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : "punctuation.operator",
	                regex : /[.](?![.])/
	            }, {
	                token : "support.function",
	                regex : /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
	            }, {
	                token : "support.function.dom",
	                regex : /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
	            }, {
	                token :  "support.constant",
	                regex : /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
	            }, {
	                token : "identifier",
	                regex : identifierRe
	            }, {
	                regex: "",
	                token: "empty",
	                next: "no_regex"
	            }
	        ],
	        "start": [
	            DocCommentHighlightRules.getStartRule("doc-start"),
	            comments("start"),
	            {
	                token: "string.regexp",
	                regex: "\\/",
	                next: "regex"
	            }, {
	                token : "text",
	                regex : "\\s+|^$",
	                next : "start"
	            }, {
	                token: "empty",
	                regex: "",
	                next: "no_regex"
	            }
	        ],
	        "regex": [
	            {
	                token: "regexp.keyword.operator",
	                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
	            }, {
	                token: "string.regexp",
	                regex: "/[sxngimy]*",
	                next: "no_regex"
	            }, {
	                token : "invalid",
	                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
	            }, {
	                token : "constant.language.escape",
	                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
	            }, {
	                token : "constant.language.delimiter",
	                regex: /\|/
	            }, {
	                token: "constant.language.escape",
	                regex: /\[\^?/,
	                next: "regex_character_class"
	            }, {
	                token: "empty",
	                regex: "$",
	                next: "no_regex"
	            }, {
	                defaultToken: "string.regexp"
	            }
	        ],
	        "regex_character_class": [
	            {
	                token: "regexp.charclass.keyword.operator",
	                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
	            }, {
	                token: "constant.language.escape",
	                regex: "]",
	                next: "regex"
	            }, {
	                token: "constant.language.escape",
	                regex: "-"
	            }, {
	                token: "empty",
	                regex: "$",
	                next: "no_regex"
	            }, {
	                defaultToken: "string.regexp.charachterclass"
	            }
	        ],
	        "function_arguments": [
	            {
	                token: "variable.parameter",
	                regex: identifierRe
	            }, {
	                token: "punctuation.operator",
	                regex: "[, ]+"
	            }, {
	                token: "punctuation.operator",
	                regex: "$"
	            }, {
	                token: "empty",
	                regex: "",
	                next: "no_regex"
	            }
	        ],
	        "qqstring" : [
	            {
	                token : "constant.language.escape",
	                regex : escapedRe
	            }, {
	                token : "string",
	                regex : "\\\\$",
	                consumeLineEnd  : true
	            }, {
	                token : "string",
	                regex : '"|$',
	                next  : "no_regex"
	            }, {
	                defaultToken: "string"
	            }
	        ],
	        "qstring" : [
	            {
	                token : "constant.language.escape",
	                regex : escapedRe
	            }, {
	                token : "string",
	                regex : "\\\\$",
	                consumeLineEnd  : true
	            }, {
	                token : "string",
	                regex : "'|$",
	                next  : "no_regex"
	            }, {
	                defaultToken: "string"
	            }
	        ]
	    };

	    if (!options || !options.noES6) {
	        this.$rules.no_regex.unshift({
	            regex: "[{}]", onMatch: function(val, state, stack) {
	                this.next = val == "{" ? this.nextState : "";
	                if (val == "{" && stack.length) {
	                    stack.unshift("start", state);
	                }
	                return val == "{" ? "paren.lparen" : "paren.rparen";
	            },
	            nextState: "start"
	        }, {
	            token : "string.quasi.start",
	            regex : /`/,
	            push  : [{
	                token : "constant.language.escape",
	                regex : escapedRe
	            }, {
	                token : "paren.quasi.start",
	                regex : /\${/,
	                push  : "start"
	            }, {
	                token : "string.quasi.end",
	                regex : /`/,
	                next  : "pop"
	            }, {
	                defaultToken: "string.quasi"
	            }]
	        });
	    }

	    this.embedRules(DocCommentHighlightRules, "doc-",
	        [ DocCommentHighlightRules.getEndRule("no_regex") ]);

	    this.normalizeRules();

	    oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

	}
}

export default class MacroModHighlight extends window.ace.acequire('ace/mode/java').Mode {
	constructor() {
		super();
		this.HighlightRules = CustomHighlightRules;
	}
}
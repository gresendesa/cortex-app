export const cortexMacroModCommands = [

  {
    "value": '{* block blockname *}\n{* endblock *}',
    "score": 2,
    "meta": "Templating block"
  },

  {
    "value": '{* macro mymacro() *}\n{* endmacro *}',
    "score": 2,
    "meta": "Templating block"
  },

  {
    "value": '{* import "library.template" as ALIAS *}',
    "score": 2,
    "meta": "import snippet"
  },

  {
    "value": '{* include "library.template" *}',
    "score": 2,
    "meta": "import snippet"
  },

  {
    "value": '{{ inform("msg") }}',
    "score": 2,
    "meta": "Set the status message"
  },

  {
    "value": '{{ publish("msg") }}',
    "score": 2,
    "meta": "Set the out message"
  },

  {
    "value": '{{ receive("&outvar") }}',
    "score": 2,
    "meta": "Extracts the in message"
  },

  {
    "value": '{{ send("pname", "msg") }}',
    "score": 2,
    "meta": "Sends a message to process on IN foreign process"
  },

  {
    "value": '{{ read("pname", "&outvar") }}',
    "score": 2,
    "meta": "Reads the message from the OUT foreign process"
  },


  {
    "value": '{{ pause("msg") }}',
    "score": 2,
    "meta": "Pauses execution from on the process"
  },

  {
    "value": '{{ stop("msg") }}',
    "score": 2,
    "meta": "Stops the execution on the process"
  },

  {
    "value": '{{ interrupt() }}',
    "score": 2,
    "meta": "Interrupts the task execution"
  },


  {
    "value": '{{ loop() }}',
    "score": 2,
    "meta": "Interrupts a loop exection if necessary"
  },

  {
    "value": '{{ jump("task") }}',
    "score": 2,
    "meta": "Jump shortcut"
  },
  {
    "value": '{{ call("task") }}',
    "score": 2,
    "meta": "Call shortcut"
  },
  {
    "value": '{{ return("value") }}',
    "score": 2,
    "meta": "Return shortcut"
  },
  {
    "value": '{{ value("&outvar") }}',
    "score": 2,
    "meta": "Put returned value into a var"
  },
  {
    "value": '{{ last_task("&outvar") }}',
    "score": 2,
    "meta": "Put the last task name into a var"
  },

  {
    "value": '{{ get(1,"&outvar") }}',
    "score": 1,
    "meta": "Get an argument and stores it into a var"
  },

  {
    "value": "SET(&transition_,\"jump\ task()\");\nSET(interrupt_);",
    "score": 1,
    "meta": "Raw jump transition"
  },

  {
    "value": "SET(&transition_,\"call\ task() => task2()\");\nSET(interrupt_);",
    "score": 1,
    "meta": "Raw call transition"
  },
  {
    "value": "SET(&transition_,\"return <value>);\nSET(interrupt_);",
    "score": 1,
    "meta": "Raw return transition"
  },


  {
    "value": "ACHIEVEMENTGET(<text>,[itemid[:damage]]);",
    "score": 1,
    "meta": "Displays an \"Advancement made!\" popup you get when completing an advancement with a custom message and optionally a custom item.\n\nThe successor is [TOAST](/docs/actions/toast) with the option to create other types of popups."
  },
  {
    "value": "%ALT%",
    "score": 1,
    "meta": "Whether the Alt key is pressed"
  },
  {
    "value": "%AMBIENTVOLUME%",
    "score": 1,
    "meta": "Volume level for Ambient/Environment"
  },
  {
    "value": "%ARMOUR%",
    "score": 1,
    "meta": "Armour points (each icon equals 2 points)"
  },
  {
    "value": "ARRAYSIZE(<array[]>,[#outvar]);",
    "score": 1,
    "meta": "Stores the size of the specified `<array[]>` in `[#outvar]`.\n\nReturns the size of the array."
  },
  {
    "value": "<var> = <value>;",
    "score": 1,
    "meta": "Internal function"
  },
  {
    "value": "%ATTACKPOWER%",
    "score": 1,
    "meta": "Attack power"
  },
  {
    "value": "%ATTACKSPEED%",
    "score": 1,
    "meta": "Attack speed"
  },
  {
    "value": "BIND(<bind>,<keycode>);",
    "score": 1,
    "meta": "Set the specified key binding to the specified key code"
  },
  {
    "value": "BINDGUI(<slot>,<screen>);",
    "score": 1,
    "meta": "Binds the specified custom screen to the slot specified"
  },
  {
    "value": "%BIOME%",
    "score": 1,
    "meta": "Biome the Player is currently in.\n\nCan be one of the following values:\n* `Ocean`\n* `Plains`\n* `Desert`\n* `Extreme Hills`\n* `Forest`\n* `Taiga`\n* `Swampland`\n* `River`\n* `Hell`\n* `Sky`\n* `Frozen Ocean`\n* `Frozen River`\n* `Ice Plains`\n* `Ice Mountains`\n* `Mushroom Island`\n* `Mushroom Island Shore`\n* `Beach`\n* `Desert Hills`\n* `Forest Hills`\n* `Taiga Hills`\n* `Extreme Hills Edge`\n* `Jungle`\n* `Jungle Hills `"
  },
  {
    "value": "%BLOCKVOLUME%",
    "score": 1,
    "meta": "Volume level for Blocks"
  },
  {
    "value": "%BOOTSDAMAGE%",
    "score": 1,
    "meta": "Maximum uses of the Players boots"
  },
  {
    "value": "%BOOTSDURABILITY%",
    "score": 1,
    "meta": "Durability of the Players boots"
  },
  {
    "value": "%BOOTSID%",
    "score": 1,
    "meta": "ID of the Players boots"
  },
  {
    "value": "%BOOTSNAME%",
    "score": 1,
    "meta": "Displayname of the Players boots"
  },
  {
    "value": "%BOWCHARGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "BREAK;",
    "score": 1,
    "meta": "Interrupts exection of the innermost loop.\n\nCan be used with:\n* `DO;LOOP`\n* `DO;UNTIL`\n* `DO;WHILE`\n* `FOR;NEXT`\n* `FOREACH;NEXT`"
  },
  {
    "value": "CALCYAWTO(<xpos>,<zpos>,[#yaw],[#distance]);",
    "score": 1,
    "meta": "Calculates the absolute yaw angle and optionally the distance to the specified coordinates.\n\nReturns the calculated yaw value."
  },
  {
    "value": "CAMERA([mode]);",
    "score": 1,
    "meta": "Set the current camera mode, call with no arguments to toggle modes\n\nCan be one of the following values:\n\n * `0` for first person view\n * `1` for third person view, from behind\n * `2` for third person view, from the front"
  },
  {
    "value": "%CAMERA%",
    "score": 1,
    "meta": "Current camera mode"
  },
  {
    "value": "%CANFLY%",
    "score": 1,
    "meta": "Whether the Player can fly"
  },
  {
    "value": "%CARDINALYAW%",
    "score": 1,
    "meta": "Yaw of the player relative to north (YAW + 180)"
  },
  {
    "value": "%CHAT%",
    "score": 1,
    "meta": "Chat message with control codes"
  },
  {
    "value": "%CHATCLEAN%",
    "score": 1,
    "meta": "Chat message without control codes"
  },
  {
    "value": "CHATFILTER(<enabled>);",
    "score": 1,
    "meta": "Enable or disable the chat filter"
  },
  {
    "value": "CHATHEIGHT(<value>,[time]);",
    "score": 1,
    "meta": "Set height of the Minecraft chat whilst ingame.\n\n`<value>` has to be between `20` and `180`."
  },
  {
    "value": "CHATHEIGHTFOCUSED(<value>,[time]);",
    "score": 1,
    "meta": "Set height of the Minecraft chat whilst in the chat GUI.\n\n`<value>` has to be between `20` and `180`."
  },
  {
    "value": "%CHATMESSAGE%",
    "score": 1,
    "meta": "The message part of an incoming chat line. Just a guess, could be wrong."
  },
  {
    "value": "CHATOPACITY(<value>,[time]);",
    "score": 1,
    "meta": "Set opacity of the Minecraft chat.\n\n`<value>` has to be between `10` and `100`."
  },
  {
    "value": "%CHATPLAYER%",
    "score": 1,
    "meta": "The player who send a chat line. Just a guess, could be wrong."
  },
  {
    "value": "CHATSCALE(<value>,[time]);",
    "score": 1,
    "meta": "Set scale of the Minecraft chat.\n\n`<value>` has to be between `0` and `100`."
  },
  {
    "value": "CHATVISIBLE(<value>);",
    "score": 1,
    "meta": "Set visibility of minecraft chat.\n\nBy default it toggles between Shown and Hidden.\n\nCan be one of the following values:\n* `\"show\"` or `0` for __Shown__\n* `\"commands\"` or `1` for __Commands Only__\n* `\"hidden\"` or `2` for __Hiddenn__\n\nReturns the new visibility state."
  },
  {
    "value": "CHATWIDTH(<value>,[time]);",
    "score": 1,
    "meta": "Set width of the Minecraft chat.\n\n`<value>` has to be between `40` and `320`."
  },
  {
    "value": "%CHESTPLATEDAMAGE%",
    "score": 1,
    "meta": "Maximum uses of the Players chestplate"
  },
  {
    "value": "%CHESTPLATEDURABILITY%",
    "score": 1,
    "meta": "Durability of the Players chestplate"
  },
  {
    "value": "%CHESTPLATEID%",
    "score": 1,
    "meta": "ID of the Players chestplate"
  },
  {
    "value": "%CHESTPLATENAME%",
    "score": 1,
    "meta": "Displayname of the Players chestplate"
  },
  {
    "value": "%CHUNKUPDATES%",
    "score": 1,
    "meta": "Amount of chunk updates"
  },
  {
    "value": "CLEARCHAT();",
    "score": 1,
    "meta": "Clears all messages from the chat window"
  },
  {
    "value": "CLEARCRAFTING();",
    "score": 1,
    "meta": "Cancels any queued crafting jobs"
  },
  {
    "value": "CONFIG(<configname>);",
    "score": 1,
    "meta": "Switch to the specified configuration"
  },
  {
    "value": "%CONFIG%",
    "score": 1,
    "meta": "Loaded config"
  },
  {
    "value": "%CONTAINERSLOTS%",
    "score": 1,
    "meta": "Amount of slots in opened container"
  },
  {
    "value": "%CONTROLID%",
    "score": 1,
    "meta": "Internal id of the current control."
  },
  {
    "value": "%CONTROLNAME%",
    "score": 1,
    "meta": "The name set in the control under *Control Name*."
  },
  {
    "value": "%CONTROLTYPE%",
    "score": 1,
    "meta": "Type of the current control.\n\nCan be one of the following values:\n* `BUTTON`\n* `ICON`\n* `LABEL`\n* `LAYOUT` (Custom Gui)\n* `PLAYBACKSTATUS`\n* `PROGRESSBAR`\n* `SLIDER`\n* `TEXTAREA`"
  },
  {
    "value": "%COOLDOWN%",
    "score": 1,
    "meta": "Cooldown"
  },
  {
    "value": "CRAFT(<item[:damage]>,[amount],[throw],[verbose]);",
    "score": 1,
    "meta": "Queues an auto-crafting request"
  },
  {
    "value": "CRAFTANDWAIT(<item[:id]>,[amount],[throw],[verbose]);",
    "score": 1,
    "meta": "Queues an auto-crafting request and waits for it to complete"
  },
  {
    "value": "%CTRL%",
    "score": 1,
    "meta": "Whether the Control key is pressed"
  },
  {
    "value": "%DATE%",
    "score": 1,
    "meta": "Current date in the format \"year-month-day\""
  },
  {
    "value": "%DATETIME%",
    "score": 1,
    "meta": "Current date and time in the format \"year-month-day hour:minute:second\""
  },
  {
    "value": "%DAY%",
    "score": 1,
    "meta": "Number of day"
  },
  {
    "value": "%DAYTICKS%",
    "score": 1,
    "meta": "TICKS value modulo 24000 and shifted back 6000 so that 0 aligns with midnight "
  },
  {
    "value": "%DAYTIME%",
    "score": 1,
    "meta": "Ingame time in the format hh:mm"
  },
  {
    "value": "DEC(<#var>,[amount]);",
    "score": 1,
    "meta": "Decrements the specified counter by 1 or by the specified amount"
  },
  {
    "value": "DECODE(<input>,[&output]);",
    "score": 1,
    "meta": "Converts an string from base64 back to an normal string.\n\nReturns the decoded string."
  },
  {
    "value": "%DIFFICULTY%",
    "score": 1,
    "meta": "Difficulty of the world"
  },
  {
    "value": "%DIMENSION%",
    "score": 1,
    "meta": "Dimension the Player is in.\n\nCan be one of the following values:\n* `NETHER`\n* `SURFACE`\n* `END`\n* `UNKNOWN`"
  },
  {
    "value": "%DIRECTION%",
    "score": 1,
    "meta": "Direction the Player is looking at, shortened to the first character.\n\nCan be one of the following values:\n* `N`\n* `E`\n* `S`\n* `W`"
  },
  {
    "value": "DISCONNECT();",
    "score": 1,
    "meta": "Disconnects from the current game or server"
  },
  {
    "value": "%DISPLAYHEIGHT%",
    "score": 1,
    "meta": "Height of the minecraft window"
  },
  {
    "value": "%DISPLAYNAME%",
    "score": 1,
    "meta": "Player's displayname"
  },
  {
    "value": "%DISPLAYWIDTH%",
    "score": 1,
    "meta": "Width of the minecraft window"
  },

  {
    "value": "DO(10);\nLOOP;",
    "score": 2,
    "meta": "Begins a loop.\n\nWhen used together with `LOOP` you can specify an amount of loops. When not specified it will loop forever.\n\nCan also be used together with `WHILE` or `UNTIL`."
  },
  {
    "value": "DO([count]);",
    "score": 1,
    "meta": "Begins a loop.\n\nWhen used together with `LOOP` you can specify an amount of loops. When not specified it will loop forever.\n\nCan also be used together with `WHILE` or `UNTIL`."
  },

  {
    "value": "%DURABILITY%",
    "score": 1,
    "meta": "Durability of the equipped item"
  },
  {
    "value": "ECHO(<text>);",
    "score": 1,
    "meta": "Sends the specified message to the server"
  },
  {
    "value": "%EFFECT%",
    "score": 1,
    "meta": "Internal string id of the effect."
  },
  {
    "value": "%EFFECTID%",
    "score": 1,
    "meta": "Internal numeric id of the effect."
  },
  {
    "value": "%EFFECTNAME%",
    "score": 1,
    "meta": "Display name of the effect."
  },
  {
    "value": "%EFFECTPOWER%",
    "score": 1,
    "meta": "Power of the effect."
  },
  {
    "value": "%EFFECTTIME%",
    "score": 1,
    "meta": "Remaining time of the effect in seconds."
  },
  {
    "value": "ELSE;",
    "score": 1,
    "meta": "The actions following this action will only be executed if no if-clause before evaluated to `true`.\n\nCan be used with:\n* `IF`\n* `IFBEGINSWITH`\n* `IFCONTAINS`\n* `IFENDSWITH`\n* `IFMATCHES`\n* `ELSEIF`"
  },
  {
    "value": "ELSEIF(<condition>);",
    "score": 1,
    "meta": "The actions following this action will only be executed when the `<condition>` evaluates to `true` and no if-clause before evaluated to true.\n\nCan be used with:\n\n* `IF`\n* `IFBEGINSWITH`\n* `IFCONTAINS`\n* `IFENDSWITH`\n* `IFMATCHES`\n"
  },
  {
    "value": "%ENCHANTMENT%",
    "score": 1,
    "meta": "Display name of the enchantment"
  },
  {
    "value": "%ENCHANTMENTNAME%",
    "score": 1,
    "meta": "Only the name of the enchantment."
  },
  {
    "value": "%ENCHANTMENTPOWER%",
    "score": 1,
    "meta": "Power of the enchantment."
  },
  {
    "value": "ENCODE(<input>,[&output]);",
    "score": 1,
    "meta": "Converts an string to base 64.\n\nReturns the encoded value."
  },
  {
    "value": "ENDIF;",
    "score": 1,
    "meta": "Ends an if-clause."
  },
  {
    "value": "ENDUNSAFE;",
    "score": 1,
    "meta": "Ends an active UNSAFE block"
  },
  {
    "value": "EXEC(<file.txt>,[taskname],[params],...);",
    "score": 1,
    "meta": "Creates a task by running the specified script file.\n\nThe params will be provided to the script as either variables (`&var1`, `&var2`, `&var3`, ...) or parameters (`$$[1]`, `$$[2]`, `$$[3]`, ...)."
  },
  {
    "value": "FILTER;",
    "score": 1,
    "meta": "Indicate that this chat meesage should be filtered and terminate"
  },
  {
    "value": "%FLYING%",
    "score": 1,
    "meta": "Whether the Player is flying"
  },
  {
    "value": "FOG([value]);",
    "score": 1,
    "meta": "Toggles render distance, or optionally specify render distance\n\nCan be one of the following values:\n\n * `\"far\"` for 16 chunks\n * `\"normal\"` for 8 chunks\n * `\"short\"` for 4 chunks\n * `\"tiny\"` for 2 chunks\n\nAlternatively the amount of chunks (up to 16) can also be specified directly"
  },
  {
    "value": "FOR(#i,0,10);\nNEXT;",
    "score": 2,
    "meta": "Begins a for loop using the specified var as a loop counter.\nNeeds to be closed with `NEXT`.\n\nThe loop can be stopped early by using `BREAK`.\n\nAlternative syntax:\n```\nFOR(<#var> = <start> to <end>)\nFOR(<#var> = <start> to <end> step <step>)\n```\n\n__Bug!__\nThe `[step]` parameter in the default syntax currently does not work."
  },
  {
    "value": "FOR(<#var>,<start>,<end>,[step]);",
    "score": 1,
    "meta": "Begins a for loop using the specified var as a loop counter.\nNeeds to be closed with `NEXT`.\n\nThe loop can be stopped early by using `BREAK`.\n\nAlternative syntax:\n```\nFOR(<#var> = <start> to <end>)\nFOR(<#var> = <start> to <end> step <step>)\n```\n\n__Bug!__\nThe `[step]` parameter in the default syntax currently does not work."
  },
  {
    "value": "FOREACH(<iterator>);",
    "score": 1,
    "meta": "Runs a loop over the specified iterator.\nNeeds to be closed with `NEXT`.\n\nThe iterator can either be [one of the these](/docs/iterators/) or an array.\n\nThe loop can be stopped early by using `BREAK`.\n\nAlternative Syntax:\n```\nFOREACH(<&array[]>,<&content>,[#index])\nFOREACH(<&array[]> as <&content>)\nFOREACH(<&array[]> as <#index> => <&content>)\n```"
  },
  {
    "value": "FOV(<value>,[time]);",
    "score": 1,
    "meta": "Sets the FOV angle in degrees, specifying time causes the value to change smoothly.\n\n`<value>` has to be between `70` and `110`."
  },
  {
    "value": "%FOV%",
    "score": 1,
    "meta": "Field of View"
  },
  {
    "value": "%FPS%",
    "score": 1,
    "meta": "Frames per Second"
  },
  {
    "value": "%GAMEMODE%",
    "score": 1,
    "meta": "Gamemode of the player as a string.\n\nCan be one of the following values:\n* `SURVIVAL`\n* `CREATIVE`\n* `ADVENTURE`\n* `SPECTATOR`"
  },
  {
    "value": "GAMMA(<value>,[time]);",
    "score": 1,
    "meta": "Sets the brightness value (percent), specifying time causes the value to change smoothly.\n\n`<value>` has to be between `0` and `200`."
  },
  {
    "value": "%GAMMA%",
    "score": 1,
    "meta": "Brightness level"
  },
  {
    "value": "GETID(<x>,<y>,<z>,[&idvar],[#datavar]);",
    "score": 1,
    "meta": "Gets the ID and optionally the data value of the block at the specified coordinates in the world.\n\nReturns the name of the block."
  },
  {
    "value": "GETIDREL(<xoffset>,<yoffset>,<zoffset>,[&idvar],[#datavar]);",
    "score": 1,
    "meta": "Gets the ID and optionally the data value of the block at the specified coordinates relative to the player.\n\nReturns the name of the block."
  },
  {
    "value": "GETITEMINFO(<item[:damage]>,[&namevar],[#maxstacksize],[&type],[&dropid]);",
    "score": 1,
    "meta": "Gets the name and other info for the specified item id\n\nReturns the item name"
  },
  {
    "value": "GETPROPERTY(<control>,<property>);",
    "score": 1,
    "meta": "Returns the value of the specified property from the specified GUI control\n\n\nThe following properties are available for each control:\n\n * __Button__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"hotkey\"`\n    * `\"text\"`\n    * `\"hide\"`\n    * `\"sticky\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Icon__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"align\"`\n    * `\"scale\"`\n    * `\"damage\"`\n    * `\"background\"`\n * __Label__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"align\"`\n    * `\"text\"`\n    * `\"binding\"`\n    * `\"shadow\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Custom Gui__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"layout\"`\n    * `\"width\"`\n    * `\"heigth\"`\n * __Playback Status__\n    * `\"name\"`\n    * `\"visible\"`\n * __Progress Bar__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"expression\"`\n    * `\"style\"`\n    * `\"min\"`\n    * `\"max\"`\n    * `\"calcmin\"`\n    * `\"calcmax\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Slider__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"binding\"`\n    * `\"hotkeydec\"`\n    * `\"hotkeyinc\"`\n    * `\"min\"`\n    * `\"max\"`\n    * `\"calcmin\"`\n    * `\"calcmax\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Textarea__\n    * `\"name\"`\n    * `\"visible\"`\n    * `\"lifespan\"`\n    * `\"colour\"`"
  },
  {
    "value": "GETSLOT(<item[:damage]>,<#slotid>,[startfromslotid]);",
    "score": 1,
    "meta": "Gets the id of the slot containing an item matching the specified item id\r\n\r\nReturns the slot number"
  },
  {
    "value": "GETSLOTITEM(<slotid>,<&idvar>,[#stacksizevar],[#datavar]);",
    "score": 1,
    "meta": "Gets information about the item in the specified slot\n\nReturns the item name"
  },
  {
    "value": "GUI([name]);",
    "score": 1,
    "meta": "Opens the specified gui screen.\r\nIf no `[name]` is specified it will close the currently open gui.\r\n\r\nPossible values:\r\n* `\"chat\"`\r\n* `\"filterablechat\"`\r\n* `\"menu\"`\r\n* `\"inventory\"`\r\n* `\"options\"`\r\n* `\"video\"`\r\n* `\"controls\"`\r\n* `\"macrobind\"`\r\n* `\"macroplayback\"`\r\n* `\"macroconfig\"`\r\n* `\"texteditor\"`\r\n* `\"repl\"`"
  },
  {
    "value": "%GUI%",
    "score": 1,
    "meta": "Name of the currently open GUI.\n\nCan be one of the following values:\n* `UNKNOWN`\n* `GUISTATS`\n* `GUISCREENADVANCEMENTS`\n* `GUICHAT`\n* `GUICOMMANDBLOCK`\n* `GUICONFIRMOPENLINK`\n* `GUICONTROLS`\n* `GUICREATEFLATWORLD`\n* `GUICREATEWORLD`\n* `GUICUSTOMIZESKIN`\n* `GUICUSTOMIZEWORLDSCREEN`\n* `GUIDISCONNECTED`\n* `GUIDOWNLOADTERRAIN`\n* `GUIENCHANTMENT`\n* `GUIERRORSCREEN`\n* `GUIFLATPRESETS`\n* `GUIGAMEOVER`\n* `GUIHOPPER`\n* `GUIINGAMEMENU`\n* `GUILANGUAGE`\n* `GUIMAINMENU`\n* `GUIMEMORYERRORSCREEN`\n* `GUIMERCHANT`\n* `GUIMULTIPLAYER`\n* `GUIOPTIONS`\n* `GUIREPAIR`\n* `GUISCREENADDSERVER`\n* `GUISCREENBOOK`\n* `GUISCREENCUSTOMIZEPRESETS`\n* `GUISCREENDEMO`\n* `GUISCREENOPTIONSSOUNDS`\n* `GUISCREENREALMSPROXY`\n* `GUISCREENRESOURCEPACKS`\n* `GUISCREENSERVERLIST`\n* `GUISCREENWORKING`\n* `GUISHARETOLAN`\n* `GUISLEEPMP`\n* `GUISNOOPER`\n* `GUIVIDEOSETTINGS`\n* `GUIWINGAME`\n* `GUIWORLDEDIT`\n* `GUIWORLDSELECTION`\n* `GUIYESNO`\n* `GUIBEACON`\n* `GUIBREWINGSTAND`\n* `GUICHEST`\n* `GUICONTAINERCREATIVE`\n* `GUICRAFTING`\n* `GUIDISPENSER`\n* `GUIEDITCOMMANDBLOCKMINECART`\n* `GUIEDITSIGN`\n* `GUIEDITSTRUCTURE`\n* `GUIFURNACE`\n* `GUIINVENTORY`\n* `GUISCREENHORSEINVENTORY`\n* `GUISHULKERBOX`\n* `SCREENCHATOPTIONS`\n* `GUICONNECTING`\n"
  },
  {
    "value": "%HEALTH%",
    "score": 1,
    "meta": "Health points (each icon equals 2 points)"
  },
  {
    "value": "%HELMDAMAGE%",
    "score": 1,
    "meta": "Maximum uses of the Players helm"
  },
  {
    "value": "%HELMDURABILITY%",
    "score": 1,
    "meta": "Durability of the Players helm"
  },
  {
    "value": "%HELMID%",
    "score": 1,
    "meta": "ID of the Players helm"
  },
  {
    "value": "%HELMNAME%",
    "score": 1,
    "meta": "Displayname of the Players helm"
  },
  {
    "value": "%HIT%",
    "score": 1,
    "meta": "Type of the thing the Player is looking at\n\nCan be one of the following values:\n\n* `TILE`\n* `PLAYER`\n* `ENTITY`\n* `NONE`"
  },
  {
    "value": "%HIT_<name>%",
    "score": 1,
    "meta": "Value of the specified property of the block the Player is looking at"
  },
  {
    "value": "%HIT_AGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_ATTACHED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_AXIS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_BITES%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_CHECK_DECAY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_COLOR%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_CONDITIONAL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_CONTENTS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_DAMAGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_DECAYABLE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_DELAY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_DISARMED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_DOWN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_EAST%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_ENABLED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_EXPLODE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_EXTENDED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_EYE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_FACING%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_HALF%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_HAS_BOTTLE_0%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_HAS_BOTTLE_1%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_HAS_BOTTLE_2%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_HAS_RECORD%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_HINGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_IN_WALL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_LAYERS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_LEGACY_DATA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_LEVEL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_LOCKED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_MODE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_MOISTURE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_NODROP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_NORTH%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_OCCUPIED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_OPEN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_PART%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_POWER%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_POWERED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_ROTATION%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_SEAMLESS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_SHAPE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_SHORT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_SNOWY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_SOUTH%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_STAGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_TRIGGERED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_TYPE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_UP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_VARIANT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_WEST%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HIT_WET%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%HITDATA%",
    "score": 1,
    "meta": "Metadata of the thing the Player is looking at"
  },
  {
    "value": "%HITID%",
    "score": 1,
    "meta": "ID of the thing the Player is looking at"
  },
  {
    "value": "%HITNAME%",
    "score": 1,
    "meta": "Displayname of the thing the Player is looking at"
  },
  {
    "value": "%HITPROGRESS%",
    "score": 1,
    "meta": "Block breaking progress of the block the Player is looking at"
  },
  {
    "value": "%HITSIDE%",
    "score": 1,
    "meta": "Block side of the block the Player is looking at.\n\n\nCan be one of the following values:\n\n* `N`\n* `E`\n* `S`\n* `W`\n* `T`\n* `B`\n* `?`"
  },
  {
    "value": "%HITUUID%",
    "score": 1,
    "meta": "UUID of the looked at entity or player"
  },
  {
    "value": "%HITX%",
    "score": 1,
    "meta": "X position of the block the Player is looking at"
  },
  {
    "value": "%HITY%",
    "score": 1,
    "meta": "Y position of the block the Player is looking at"
  },
  {
    "value": "%HITZ%",
    "score": 1,
    "meta": "Z position of the block the Player is looking at"
  },
  {
    "value": "%HOSTILEVOLUME%",
    "score": 1,
    "meta": "Volume level for Hostile Creatures"
  },
  {
    "value": "%HUNGER%",
    "score": 1,
    "meta": "Hunger points (each icon equals 2 points)"
  },

  {
    "value": "IF(#subject>=10);\nELSE;\nENDIF;",
    "score": 2,
    "meta": "The actions following this action will only be executed when the `<condition>` evaluates to `true`.\n\nNeeds to be closed with an `ENDIF`."
  },
  {
    "value": "IF(<condition>);",
    "score": 1,
    "meta": "The actions following this action will only be executed when the `<condition>` evaluates to `true`.\n\nNeeds to be closed with an `ENDIF`."
  },

  {
    "value": "IFBEGINSWITH(<haystack>,<needle>);",
    "score": 1,
    "meta": "The actions following this action will only be executed when the `<haystack>` starts with `<needle>`."
  },
  {
    "value": "IFCONTAINS(<haystack>,<needle>);",
    "score": 1,
    "meta": "The actions following this action will only be executed when the `<haystack>` starts with `<needle>`."
  },
  {
    "value": "IFENDSWITH(<haystack>,<needle>);",
    "score": 1,
    "meta": "The actions following this action will only be executed when the `<haystack>` ends with `<needle>`."
  },

  {
    "value": "IFMATCHES(%&subject%,\"regex\");\nELSE;\nENDIF;",
    "score": 2,
    "meta": "The actions following this action will only be executed when the `<subject>` matches the `<pattern>`.\n\nOptionally the whole match (or only a group specified by `[group]`) can be saved into `[&target]`."
  },
  {
    "value": "IFMATCHES(<subject>,<pattern>,[&target],[group]);",
    "score": 1,
    "meta": "The actions following this action will only be executed when the `<subject>` matches the `<pattern>`.\n\nOptionally the whole match (or only a group specified by `[group]`) can be saved into `[&target]`."
  },

  {
    "value": "IIF(<condition>,<truetext>,[falsetext]);",
    "score": 1,
    "meta": "Inline IF statement.\n\nSends `<truetext>` as a chat message if condition succeeds, or sends `<falsetext>` if not."
  },
  {
    "value": "IMPORT(<configname>);",
    "score": 1,
    "meta": "Overlay the specified configuration"
  },

  {
    "value": "INC(<#var>,[amount]);",
    "score": 1,
    "meta": "Increments the specified counter by 1 or by the specified amount"
  },
  {
    "value": "INDEXOF(<array[]>,<#outvar>,<searchfor>,[casesensitiv]);",
    "score": 1,
    "meta": "Gets the first index of `<searchfor>` in `<array[]>` and stores it in `<#outvar>`.\n\n`[casesensitiv]` can be set to `true` which will cause the check to be case-sensitiv. (By default the search is case-insensitiv.)\n\nReturns the found index."
  },
  {
    "value": "INVENTORYDOWN([amount]);",
    "score": 1,
    "meta": "Scrolls the specified number of slots down through the hotbar"
  },
  {
    "value": "INVENTORYUP([amount]);",
    "score": 1,
    "meta": "Scrolls the specified number of slots up through the hotbar"
  },
  {
    "value": "%INVSLOT%",
    "score": 1,
    "meta": "Selected inventory slot"
  },
  {
    "value": "ISRUNNING(<macro>);",
    "score": 1,
    "meta": "Returns whether the specified macro is currently running"
  },
  {
    "value": "%ITEM%",
    "score": 1,
    "meta": "ID of the equipped item"
  },
  {
    "value": "%ITEMCODE%",
    "score": 1,
    "meta": "Internal code for the equipped item"
  },
  {
    "value": "%ITEMDAMAGE%",
    "score": 1,
    "meta": "Maximum uses of the equipped item"
  },
  {
    "value": "ITEMID(<item>);",
    "score": 1,
    "meta": "Gets the legacy (numeric) ID for the specified item"
  },
  {
    "value": "%ITEMIDDMG%",
    "score": 1,
    "meta": "ID and durability seperated by a colon of the equipped item"
  },
  {
    "value": "%ITEMNAME%",
    "score": 1,
    "meta": "Displayname for the equipped item"
  },
  {
    "value": "ITEMNAME(<id>);",
    "score": 1,
    "meta": "Get the item descriptor for a legacy (numeric) item ID"
  },
  {
    "value": "%ITEMUSEPCT%",
    "score": 1,
    "meta": "Previous value as percent of total useage time."
  },
  {
    "value": "%ITEMUSETICKS%",
    "score": 1,
    "meta": "All usable items increase this value once per tick."
  },
  {
    "value": "JOIN(<glue>,<array[]>,[&output]);",
    "score": 1,
    "meta": "Combines all values inside `<array[]>` with `<glue>` and stores it optionally in `[&output]`.\n\nReturns the output."
  },
  {
    "value": "%JOINEDPLAYER%",
    "score": 1,
    "meta": "Player name of the newly joined player."
  },
  {
    "value": "KEY(<bind>);",
    "score": 1,
    "meta": "Activates the specified key binding for 1 tick\n\nCan be one of the following values:\n * `\"inventory\"`\n * `\"drop\"`\n * `\"chat\"`\n * `\"attack\"`\n * `\"use\"`\n * `\"pick\"`\n * `\"screenshot\"`\n * `\"smoothcamera\"`\n * `\"swaphands\"`\n"
  },
  {
    "value": "%KEY_<name>%",
    "score": 1,
    "meta": "Whether the key with the specified LWJGL keyname is pressed"
  },
  {
    "value": "%KEY_0%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_1%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_2%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_3%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_4%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_5%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_6%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_7%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_8%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_9%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_A%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_ADD%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_APOSTROPHE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_APPS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_AT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_AX%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_B%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_BACK%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_BACKSLASH%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_C%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_CAPITAL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_CIRCUMFLEX%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_CLEAR%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_COLON%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_COMMA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_CONVERT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_D%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_DECIMAL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_DELETE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_DIVIDE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_DOWN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_E%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_END%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_EQUALS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_ESCAPE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F1%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F10%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F11%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F12%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F13%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F14%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F15%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F16%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F17%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F18%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F19%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F2%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F3%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F4%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F5%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F6%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F7%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F8%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_F9%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_FUNCTION%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_G%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_GRAVE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_H%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_HOME%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_I%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_INSERT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_J%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_K%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_KANA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_KANJI%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_L%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_LBRACKET%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_LCONTROL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_LEFT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_LMENU%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_LMETA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_LSHIFT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_M%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_MINUS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_MOUSE3%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_MOUSE4%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_MULTIPLY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_N%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NEXT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NOCONVERT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NONE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMLOCK%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD0%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD1%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD2%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD3%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD4%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD5%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD6%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD7%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD8%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPAD9%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPADCOMMA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPADENTER%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_NUMPADEQUALS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_O%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_P%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_PAUSE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_PERIOD%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_POWER%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_PRIOR%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_Q%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_R%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RBRACKET%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RCONTROL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RETURN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RIGHT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RMENU%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RMETA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_RSHIFT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_S%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SCROLL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SECTION%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SEMICOLON%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SLASH%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SLEEP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SPACE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_STOP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SUBTRACT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_SYSRQ%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_T%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_TAB%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_U%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_UNDERLINE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_UNLABELED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_UP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_V%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_W%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_X%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_Y%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_YEN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%KEY_Z%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "KEYDOWN(<bind>);",
    "score": 1,
    "meta": "Sets the specified key binding state to pressed, only works with pressable bindings\n\nCan be one of the following values:\n\n * `\"forward\"`\n * `\"back\"`\n * `\"left\"`\n * `\"right\"`\n * `\"jump\"`\n * `\"sneak\"`\n * `\"playerlist\"`\n * `\"sprint\"`\n\nCan also be a key code value between 0 and 255"
  },
  {
    "value": "%KEYID%",
    "score": 1,
    "meta": "Key ID of the key that started this script"
  },
  {
    "value": "%KEYNAME%",
    "score": 1,
    "meta": "Keyname of the key that started this script"
  },
  {
    "value": "KEYUP(<bind>);",
    "score": 1,
    "meta": "Sets the specified key binding state to unpressed, only works with pressable bindings\n\nCan be one of the following values:\n\n * `\"forward\"`\n * `\"back\"`\n * `\"left\"`\n * `\"right\"`\n * `\"jump\"`\n * `\"sneak\"`\n * `\"playerlist\"`\n * `\"sprint\"`\n\nCan also be a key code value between 0 and 255"
  },
  {
    "value": "LCASE(<input>,[&output]);",
    "score": 1,
    "meta": "Converts the input string to lower case and stores it in output.\r\n\r\nReturns the output."
  },
  {
    "value": "%LEGGINGSDAMAGE%",
    "score": 1,
    "meta": "Maximum uses of the Players leggings"
  },
  {
    "value": "%LEGGINGSDURABILITY%",
    "score": 1,
    "meta": "Durability of the Players leggings"
  },
  {
    "value": "%LEGGINGSID%",
    "score": 1,
    "meta": "ID of the Players leggings"
  },
  {
    "value": "%LEGGINGSNAME%",
    "score": 1,
    "meta": "Displayname of the Players leggings"
  },
  {
    "value": "%LEVEL%",
    "score": 1,
    "meta": "XP level"
  },
  {
    "value": "%LIGHT%",
    "score": 1,
    "meta": "Light level at current location"
  },
  {
    "value": "%LMOUSE%",
    "score": 1,
    "meta": "Whether the left mouse button is pressed"
  },
  {
    "value": "%LOCALDIFFICULTY%",
    "score": 1,
    "meta": "Local difficulty of the world"
  },
  {
    "value": "LOG(\"§5text\");",
    "score": 1,
    "meta": "Shows the specified text only on the client-side in the chat window."
  },
  {
    "value": "LOGRAW(<json>);",
    "score": 1,
    "meta": "Similar to minecraft tellraw command, parses and outputs JSON chat into the client-side chat window."
  },
  {
    "value": "LOGTO(\"file.txt\",\"message\");",
    "score": 1,
    "meta": "Outputs the specified text into the specified target, target can be a text file name or the name of a textarea"
  },
  {
    "value": "LOOK(<yaw>,[pitch],[time]);",
    "score": 1,
    "meta": "Faces the player in the specified direction, prefix angles with + or - for relative moves\n\n`<yaw>` can also be one of the following values:\n\n * `\"north\"`\n * `\"east\"`\n * `\"south\"`\n * `\"west\"`\n * `\"near\"`"
  },
  {
    "value": "LOOKS(<yaw>,[pitch],[time]);",
    "score": 1,
    "meta": "Smoothly turnes the player to the specified direction, prefix angles with + or - for relative moves\n\n`<yaw>` can also be one of the following values:\n\n * `\"north\"`\n * `\"east\"`\n * `\"south\"`\n * `\"west\"`\n * `\"near\"`"
  },
  {
    "value": "LOOP;",
    "score": 1,
    "meta": "Ends a loop that was started with DO"
  },
  {
    "value": "%MACROID%",
    "score": 1,
    "meta": "Internal id of the macro."
  },
  {
    "value": "%MACRONAME%",
    "score": 1,
    "meta": "Display name of the macro."
  },
  {
    "value": "%MACROTIME%",
    "score": 1,
    "meta": "The time the macro is already running in seconds."
  },
  {
    "value": "%MAINHANDCOOLDOWN%",
    "score": 1,
    "meta": "MAINHANDCOOLDOWN"
  },
  {
    "value": "%MAINHANDDURABILITY%",
    "score": 1,
    "meta": "MAINHANDDURABILITY"
  },
  {
    "value": "%MAINHANDITEM%",
    "score": 1,
    "meta": "MAINHANDITEM"
  },
  {
    "value": "%MAINHANDITEMCODE%",
    "score": 1,
    "meta": "MAINHANDITEMCODE"
  },
  {
    "value": "%MAINHANDITEMDAMAGE%",
    "score": 1,
    "meta": "MAINHANDITEMDAMAGE"
  },
  {
    "value": "%MAINHANDITEMIDDMG%",
    "score": 1,
    "meta": "MAINHANDITEMIDDMG"
  },
  {
    "value": "%MAINHANDITEMNAME%",
    "score": 1,
    "meta": "MAINHANDITEMNAME"
  },
  {
    "value": "%MAINHANDSTACKSIZE%",
    "score": 1,
    "meta": "MAINHANDSTACKSIZE"
  },
  {
    "value": "MATCH(<subject>,<pattern>,[&target],[group],[default]);",
    "score": 1,
    "meta": "Runs a regular expression match on the `<subject>` and puts the result in `<&target>`.\n\nReturns the matched groups as an array.\n\nAlternative Syntax;\n```\nMATCH(<subject>,<pattern>,{&target1,&target2,&target3})\nMATCH(<subject>,<pattern>,&target[])\n```"
  },
  {
    "value": "%MAXPLAYERS%",
    "score": 1,
    "meta": "Amount of players the server can hold"
  },
  {
    "value": "%MIDDLEMOUSE%",
    "score": 1,
    "meta": "Whether the middle mouse button is pressed"
  },
  {
    "value": "%MODE%",
    "score": 1,
    "meta": "Gamemode of the player as a number.\n\nCan be one of the following values:\n* `0` for Survival\n* `1` for Creative\n* `2` for Adventure\n* `3` for Spectator"
  },
  {
    "value": "MODIFY(<newmessage>);",
    "score": 1,
    "meta": "Set new content for this chat message"
  },
  {
    "value": "%MUSIC%",
    "score": 1,
    "meta": "Volume level for Music"
  },
  {
    "value": "MUSIC(<value>,[time]);",
    "score": 1,
    "meta": "Sets the music volume, specifying time causes the value to change smoothly.\n\n`<value>` has to be between `0` and `100`."
  },
  {
    "value": "%NEUTRALVOLUME%",
    "score": 1,
    "meta": "Volume level for Friendly Creatures"
  },
  {
    "value": "NEXT;",
    "score": 1,
    "meta": "Completes a for or foreach loop"
  },
  {
    "value": "%OFFHANDCOOLDOWN%",
    "score": 1,
    "meta": "Offhand cooldown"
  },
  {
    "value": "%OFFHANDDURABILITY%",
    "score": 1,
    "meta": "Durability of the offhand item"
  },
  {
    "value": "%OFFHANDITEM%",
    "score": 1,
    "meta": "ID of the offhand item"
  },
  {
    "value": "%OFFHANDITEMCODE%",
    "score": 1,
    "meta": "Internal code for the offhand item"
  },
  {
    "value": "%OFFHANDITEMDAMAGE%",
    "score": 1,
    "meta": "Maximum uses of the offhand item"
  },
  {
    "value": "%OFFHANDITEMIDDMG%",
    "score": 1,
    "meta": "ID and durability seperated by a colon of the offhand item"
  },
  {
    "value": "%OFFHANDITEMNAME%",
    "score": 1,
    "meta": "Displayname for the offhand item"
  },
  {
    "value": "%OFFHANDSTACKSIZE%",
    "score": 1,
    "meta": "Stacksize of the offhand item"
  },
  {
    "value": "%OLDINVSLOT%",
    "score": 1,
    "meta": "Selected inventory slot before it was changed"
  },
  {
    "value": "%ONLINEPLAYERS%",
    "score": 1,
    "meta": "Amount of players currently on the server"
  },
  {
    "value": "%OXYGEN%",
    "score": 1,
    "meta": "Air Level (from 0 to 300)"
  },
  {
    "value": "PASS;",
    "score": 1,
    "meta": "Indicate that this chat meesage should PASS the filter and terminate"
  },
  {
    "value": "PICK(<item[:damage]>,[item[:damage]],...);",
    "score": 1,
    "meta": "Selects the specified item id if it is on the hotbar, specify multiple items to pick in order of preference.\n\nReturns the selected item name."
  },
  {
    "value": "%PICKUPAMOUNT%",
    "score": 1,
    "meta": "Amount of items picked up"
  },
  {
    "value": "%PICKUPDATA%",
    "score": 1,
    "meta": "Metadata of the picked up item."
  },
  {
    "value": "%PICKUPID%",
    "score": 1,
    "meta": "Item id of the picked up item."
  },
  {
    "value": "%PICKUPITEM%",
    "score": 1,
    "meta": "Display name of the picked up item."
  },
  {
    "value": "%PITCH%",
    "score": 1,
    "meta": "Pitch of the player"
  },
  {
    "value": "PLACESIGN([line1],[line2],[line3],[line4],[showgui]);",
    "score": 1,
    "meta": "Places a sign in the world with the specified text (if you have one)\n\n - `[line1]` to `[line4]` specifies the content for each sign line\n - `[showgui]` should be `true` if you want to continue editing the text\n"
  },
  {
    "value": "%PLAYER%",
    "score": 1,
    "meta": "Player's name"
  },
  {
    "value": "%PLAYERNAME%",
    "score": 1,
    "meta": "The current player"
  },
  {
    "value": "%PLAYERVOLUME%",
    "score": 1,
    "meta": "Volume level for Players"
  },
  {
    "value": "PLAYSOUND(<sound>,[volume]);",
    "score": 1,
    "meta": "Plays the specified sound.\n\nIf the `<sound>` starts with `\"custom.\"` it looks inside an folder `sounds` inside the macros config folder.\n\n`[volume]` has to be betweem `0` and `100`\n\n"
  },
  {
    "value": "POP(<array[]>,<outvar>);",
    "score": 1,
    "meta": "Removes the last entry from the end of `<array[]>` and stores it in `<outvar>`.\n\nReturns the popped element."
  },
  {
    "value": "POPUPMESSAGE(<message>,[animate]);",
    "score": 1,
    "meta": "Display a message in the area above the hotbar\n\nThe `<message>` can contain color codes.\n\nIf `[animate]` is set to true the message will animate through different colors"
  },
  {
    "value": "PRESS(<lwjgl_name>);",
    "score": 1,
    "meta": "Injects the specified key event directly into the keyboard buffer for 1 tick"
  },

  {
    "value": "PROMPT(<&target>,<paramstring>,[prompt],[override],[default]);",
    "score": 1,
    "meta": "Displays a prompt (or prompts) by parsing the params in paramstring.\n\nReturns the result."
  },

  {
    "value": "%PROPNAME%",
    "score": 1,
    "meta": "The name of the current property.\n\nCan be one of the following values:\n* `AGE`\n* `ATTACHED`\n* `AXIS`\n* `BITES`\n* `CHECK_DECAY`\n* `COLOR`\n* `CONDITIONAL`\n* `CONTENTS`\n* `DAMAGE`\n* `DECAYABLE`\n* `DELAY`\n* `DISARMED`\n* `DOWN`\n* `EAST`\n* `ENABLED`\n* `EXPLODE`\n* `EXTENDED`\n* `EYE`\n* `FACING`\n* `HALF`\n* `HAS_BOTTLE_0`\n* `HAS_BOTTLE_1`\n* `HAS_BOTTLE_2`\n* `HAS_RECORD`\n* `HINGE`\n* `IN_WALL`\n* `LAYERS`\n* `LEGACY_DATA`\n* `LEVEL`\n* `LOCKED`\n* `MODE`\n* `MOISTURE`\n* `NODROP`\n* `NORTH`\n* `OCCUPIED`\n* `OPEN`\n* `PART`\n* `POWER`\n* `POWERED`\n* `ROTATION`\n* `SEAMLESS`\n* `SHAPE`\n* `SHORT`\n* `SNOWY`\n* `SOUTH`\n* `STAGE`\n* `TRIGGERED`\n* `TYPE`\n* `UP`\n* `VARIANT`\n* `WEST`\n* `WET`"
  },
  {
    "value": "%PROPVALUE%",
    "score": 1,
    "meta": "The value of the current property."
  },
  {
    "value": "PUSH(<array[]>,<value>);",
    "score": 1,
    "meta": "Appends `<value>` to the end of `<array[]>`"
  },
  {
    "value": "PUT(<array[]>,<value>);",
    "score": 1,
    "meta": "Inserts `<value>` at the first empty point in `<array[]>`."
  },
  {
    "value": "%RAIN%",
    "score": 1,
    "meta": "Rain level"
  },
  {
    "value": "RANDOM(<#target>,[max],[min]);",
    "score": 1,
    "meta": "Assigns a random number between min and max to target.\n\nReturns the value."
  },
  {
    "value": "%REASON%",
    "score": 1,
    "meta": "The reason why the crafting was completed or aborted.\n\nCan be one of the following values:\n\n* `DONE`\n* `CREATIVE`\n* `NORECIPE`\n* `NOTSTARTED`\n* `TIMEOUT`\n* `NOITEMS`\n* `ERROR`\n* `NOSPACE`"
  },
  {
    "value": "%RECORDVOLUME%",
    "score": 1,
    "meta": "Volume level for Jukebox/Noteblocks"
  },
  {
    "value": "REGEXREPLACE(<&subject>,<pattern>,[replace]);",
    "score": 1,
    "meta": "Replace all matches of `<pattern>` with `[replace]` in `<&subject>`.\n\nReturns the new string."
  },
  {
    "value": "RELOADRESOURCES;",
    "score": 1,
    "meta": "Reloads resource packs, same as pressing F3 + T"
  },
  {
    "value": "REPL;",
    "score": 1,
    "meta": "Access the REPL interface.\n\n[Commands for the REPL have their own page](/docs/commands)"
  },
  {
    "value": "REPLACE(<&subject>,<search>,[replace]);",
    "score": 1,
    "meta": "Replace all occurrences of `<search>` with `[replace]` in `<&subject>`.\n\nReturns the new string."
  },
  {
    "value": "RESOURCEPACK([pattern]);",
    "score": 1,
    "meta": ""
  },
  {
    "value": "RESOURCEPACKS([pattern],[pattern...]);",
    "score": 1,
    "meta": "Sets the resource pack stack to the order matching the specified patterns"
  },
  {
    "value": "%RESOURCEPACKS[]%",
    "score": 1,
    "meta": "Array of selected resource packs"
  },
  {
    "value": "RESPAWN();",
    "score": 1,
    "meta": "Respawns the player if you are dead"
  },
  {
    "value": "%RMOUSE%",
    "score": 1,
    "meta": "Whether the right mouse button is pressed"
  },
  {
    "value": "%SATURATION%",
    "score": 1,
    "meta": "Saturation level (normally hidden from the Player)"
  },
  {
    "value": "%SCREEN%",
    "score": 1,
    "meta": "Name of the current custom GUI"
  },
  {
    "value": "%SCREENNAME%",
    "score": 1,
    "meta": "Display name of the current custom GUI"
  },
  {
    "value": "%SEED%",
    "score": 1,
    "meta": "Seed of the world (only available in SP)"
  },
  {
    "value": "SELECTCHANNEL(<channel>);",
    "score": 1,
    "meta": ""
  },
  {
    "value": "SENDMESSAGE([params]);",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%SENSITIVITY%",
    "score": 1,
    "meta": "Sensitivity"
  },
  {
    "value": "SENSITIVITY(<value>,[time]);",
    "score": 1,
    "meta": "Sets the mouse sensitivity, specifying time causes the value to change smoothly.\n\n`<value>` has to be between `0` and `200`."
  },
  {
    "value": "%SERVER%",
    "score": 1,
    "meta": "IP of the server"
  },
  {
    "value": "%SERVERMOTD%",
    "score": 1,
    "meta": "Motto of the day of the server"
  },
  {
    "value": "%SERVERNAME%",
    "score": 1,
    "meta": "Name of the server"
  },
  {
    "value": "SET(<target>,[value]);",
    "score": 1,
    "meta": "Sets the value of `<target>` to `[value]`.\n\nReturns the value."
  },
  {
    "value": "SETLABEL(<labelname>,<text>,[binding]);",
    "score": 1,
    "meta": "Sets the text (and optionally binding) of the specified label"
  },
  {
    "value": "SETPROPERTY(<control>,<property>,<value>);",
    "score": 1,
    "meta": "Sets the value of the specified property on the specified GUI control\n\nThe following properties are available for each control:\n\n * __Button__\n    * `\"visible\"`\n    * `\"hotkey\"`\n    * `\"text\"`\n    * `\"hide\"`\n    * `\"sticky\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Icon__\n    * `\"visible\"`\n    * `\"align\"`\n    * `\"scale\"`\n    * `\"damage\"`\n    * `\"background\"`\n * __Label__\n    * `\"visible\"`\n    * `\"align\"`\n    * `\"text\"`\n    * `\"binding\"`\n    * `\"shadow\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Custom Gui__\n    * `\"visible\"`\n    * `\"layout\"`\n    * `\"width\"`\n    * `\"heigth\"`\n * __Playback Status__\n    * `\"visible\"`\n * __Progress Bar__\n    * `\"visible\"`\n    * `\"expression\"`\n    * `\"style\"`\n    * `\"min\"`\n    * `\"max\"`\n    * `\"calcmin\"`\n    * `\"calcmax\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Slider__\n    * `\"visible\"`\n    * `\"binding\"`\n    * `\"hotkeydec\"`\n    * `\"hotkeyinc\"`\n    * `\"min\"`\n    * `\"max\"`\n    * `\"calcmin\"`\n    * `\"calcmax\"`\n    * `\"colour\"`\n    * `\"background\"`\n * __Textarea__\n    * `\"visible\"`\n    * `\"lifespan\"`\n    * `\"colour\"`"
  },
  {
    "value": "SETRES(<width>,<height>);",
    "score": 1,
    "meta": "Sets the size of the minecraft game window.\n\n`<width>` has to be between `0` and `3840`.\n\n`<height>` has to be between `0` and `2160`."
  },
  {
    "value": "SETSLOTITEM([item[:damage]],[slot],[amount]);",
    "score": 1,
    "meta": "Creative mode only, set the contents of a hot bar slot"
  },
  {
    "value": "%SHADERGROUP%",
    "score": 1,
    "meta": "Selected shader"
  },
  {
    "value": "SHADERGROUP([path]);",
    "score": 1,
    "meta": "Sets the active shader group to the shader matching path\n\nCan be one of the following shaders:\n\n* `\"spider\"`\n* `\"outline\"`\n* `\"desaturate\"`\n* `\"wobble\"`\n* `\"scan_pincushion\"`\n* `\"ntsc\"`\n* `\"creeper\"`\n* `\"color_convolve\"`\n* `\"blur\"`\n* `\"bits\"`\n* `\"blobs2\"`\n* `\"flip\"`\n* `\"invert\"`\n* `\"notch\"`\n* `\"antialias\"`\n* `\"entity_outline\"`\n* `\"bumpy\"`\n* `\"sobel\"`\n* `\"art\"`\n* `\"blobs\"`\n* `\"fxaa\"`\n* `\"pencil\"`\n* `\"phosphor\"`\n* `\"deconverge\"`\n* `\"green\"`\n\nYou can also use `\"+\"` or `\"-\"` to toggle between shaders.\n\nReturns the name of the selected shader."
  },
  {
    "value": "%SHADERGROUPS[]%",
    "score": 1,
    "meta": "Array of available shaders"
  },
  {
    "value": "%SHIFT%",
    "score": 1,
    "meta": "Whether the Shift key is pressed"
  },
  {
    "value": "SHOWGUI(<screen>,[esc_screen],[macro_keys]);",
    "score": 1,
    "meta": "Show a custom gui screen, creates it if it doesn't exist.\n\nSet `[macro_keys]` to `true` when macro keys should still work."
  },
  {
    "value": "%SIGNTEXT[]%",
    "score": 1,
    "meta": "Array of lines on a sign the Player is looking at"
  },
  {
    "value": "SLOT(<slot>);",
    "score": 1,
    "meta": "Selects the specified slot on the hot bar"
  },
  {
    "value": "SLOTCLICK(<slot>,[button],[shift]);",
    "score": 1,
    "meta": "Simulates clicking on the specified slot in the current GUI\n\n`<slot>` can be `-999` to drop the previously selected item.\n\n`[button]` can be either `\"left\"` for left-click or `\"right\"` for right-click\n\n`[shift]` should be `true` if you want to shift-click"
  },
  {
    "value": "%SOUND%",
    "score": 1,
    "meta": "Master Volume level"
  },
  {
    "value": "SPLIT(<delimiter>,<source>,[output[]]);",
    "score": 1,
    "meta": "Splits the supplied `<source>` string on every `<delimiter>` into `<output[]>`.\n\nReturns the output array."
  },
  {
    "value": "SPRINT();",
    "score": 1,
    "meta": "Sets the player state to sprinting if sufficient stamina (food)"
  },
  {
    "value": "SQRT(<value>,[#outvar]);",
    "score": 1,
    "meta": "Calculate the rounded square root of `<value>` and store it in `<#outvar>`.\n\nReturns the result."
  },
  {
    "value": "%STACKSIZE%",
    "score": 1,
    "meta": "Stack size of the equipped item"
  },
  {
    "value": "STOP([id]);",
    "score": 1,
    "meta": "Stops the current macro, or macros matching the specified ID\n\nFor stopping all macros you can use either `\"all\"` or `\"*\"`."
  },
  {
    "value": "STORE(<type>,[name]);",
    "score": 1,
    "meta": "Stores a value into one of the predefined parameter lists\n\nCurrently only `\"place\"` is allowed for `<type>`\n\nYour current location will be saved into the `$$p` list"
  },
  {
    "value": "STOREOVER(<type>,[name]);",
    "score": 1,
    "meta": "Stores a value into one of the predefined parameter lists and overwrites an entry if it already exists\n\nCurrently only `\"place\"` is allowed for `<type>`\n\nYour current location will be saved into the `$$p` list"
  },
  {
    "value": "STRIP(<&target>,<text>);",
    "score": 1,
    "meta": "Strips all formatting codes from the specified `<text>` and assigns the result to `<&target>`.\n\nReturns the result."
  },
  {
    "value": "TEXTUREPACK([pattern]);",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TEXTUREPACK%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TICKS%",
    "score": 1,
    "meta": "current world time value (which will be a static number if doDayNightCycle game rule is false)"
  },
  {
    "value": "TILEID(<item>);",
    "score": 1,
    "meta": "Gets the legacy (numeric) ID for the specified tile"
  },
  {
    "value": "TILENAME(<id>);",
    "score": 1,
    "meta": "Get the descriptor for a legacy (numeric) tile ID"
  },
  {
    "value": "TIME(<&target>,[format]);",
    "score": 1,
    "meta": "Stores the current time and date into &target, optionally using format specified.\n\nReturns the formatted time string."
  },
  {
    "value": "%TIME%",
    "score": 1,
    "meta": "Current time in the format \"hour:minute:second\""
  },
  {
    "value": "%TIMESTAMP%",
    "score": 1,
    "meta": "UNIX Timestamp"
  },
  {
    "value": "TITLE([title],[subtitle],[inticks],[showticks],[outticks]);",
    "score": 1,
    "meta": "Displays the specified custom title, call with no arguments to hide current titles"
  },
  {
    "value": "TOAST([type],[icon],[text1],[text2],[ticks]);",
    "score": 1,
    "meta": "Displays an user-defined toast.\n\nThe following toasts are possible:\n\n * __Advancement Toast__ (\"Advancement made!\")\n   * `[type]` should be `\"advancement\"`\n   * `[icon]` can be any item name\n   * `[text1]` will be displayed\n * __Challenge Toast__ (\"Challenge complete!\")\n   * `[type]` should be `\"challenge\"`\n   * `[icon]` can be any item name\n   * `[text1]` will be displayed\n * __Goal Toast__ (\"Goal reached!\")\n   * `[type]` should be `\"goal\"`\n   * `[icon]` can be any item name\n   * `[text1]` will be displayed\n * __Recipe Toast__ (\"New Recipes Unlocked!\")\n   * `[type]` should be `\"recipe\"`\n   * `[icon]` can be any item name\n   * No text will be displayed\n * __Tutorial Toast__\n   * `[type]` should be `\"tutorial\"`\n   * `[icon]` can be one of the following values\n       * `\"keys\"`\n       * `\"mouse\"`\n       * `\"tree\"`\n       * `\"recipe_block\"`\n       * `\"planks\"`\n   * `[text1]` and `[text2]` will be displayed\n   * `[ticks]` specifies how long the toast will be displayed\n * __System Hint Toast__\n   * `[type]` should be `\"hint\"`\n   * `[icon]` should be empty\n   * `[text1]` and `[text2]` will be displayed\n * __System Narrator Toast__\n   * `[type]` should be `\"narrator\"`\n   * `[icon]` should be empty\n   * `[text1]` and `[text2]` will be displayed\n * __Remove user-defined tutorial toasts__\n   * `[type]` should be `\"clear\"`\n   * if `[icon]` is `\"all\"` vanilla toast will also be removed"
  },
  {
    "value": "TOGGLE([flag]);",
    "score": 1,
    "meta": "Toggles the specified boolean `[flag]` value"
  },
  {
    "value": "TOGGLEKEY(<bind>);",
    "score": 1,
    "meta": "Toggles the pressed state of the specified key binding, only works with pressable bindings\n\nCan be one of the following values:\n\n * `\"forward\"`\n * `\"back\"`\n * `\"left\"`\n * `\"right\"`\n * `\"jump\"`\n * `\"sneak\"`\n * `\"playerlist\"`\n * `\"sprint\"`\n\nCan also be a key code value between 0 and 255"
  },
  {
    "value": "%TOTALTICKS%",
    "score": 1,
    "meta": "current total world time (which increases all the time regardless of the gamerule doDayNightCycle)"
  },
  {
    "value": "%TOTALXP%",
    "score": 1,
    "meta": "Total amount of experience points"
  },
  {
    "value": "TRACE(<distance>,[entities]);",
    "score": 1,
    "meta": "Performs a ray trace operation which sets the raytrace variables in the local scope. \n\n`<distance>` can be between `3` and `256`\n\n`[entities]` can be true, if you want to include entities in your trace.\n\nReturns the type of the result, which can be one of the following values:\n* `TILE`\n* `PLAYER`\n* `ENTITY`\n* `NONE`"
  },
  {
    "value": "%TRACE_<name>%",
    "score": 1,
    "meta": "Value of the specified property of the executed TRACE()"
  },
  {
    "value": "%TRACE_AGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_ATTACHED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_AXIS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_BITES%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_CHECK_DECAY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_COLOR%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_CONDITIONAL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_CONTENTS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_DAMAGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_DECAYABLE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_DELAY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_DISARMED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_DOWN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_EAST%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_ENABLED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_EXPLODE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_EXTENDED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_EYE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_FACING%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_HALF%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_HAS_BOTTLE_0%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_HAS_BOTTLE_1%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_HAS_BOTTLE_2%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_HAS_RECORD%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_HINGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_IN_WALL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_LAYERS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_LEGACY_DATA%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_LEVEL%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_LOCKED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_MODE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_MOISTURE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_NODROP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_NORTH%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_OCCUPIED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_OPEN%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_PART%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_POWER%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_POWERED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_ROTATION%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_SEAMLESS%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_SHAPE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_SHORT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_SNOWY%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_SOUTH%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_STAGE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_TRIGGERED%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_TYPE%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_UP%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_VARIANT%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_WEST%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACE_WET%",
    "score": 1,
    "meta": ""
  },
  {
    "value": "%TRACEDATA%",
    "score": 1,
    "meta": "Metadata of the block"
  },
  {
    "value": "%TRACEID%",
    "score": 1,
    "meta": "The id"
  },
  {
    "value": "%TRACENAME%",
    "score": 1,
    "meta": "The name"
  },
  {
    "value": "%TRACESIDE%",
    "score": 1,
    "meta": "Side of the block.\n\nCan be one of the following values:\n\n* `N`\n* `E`\n* `S`\n* `W`\n* `T`\n* `B`\n* `?`\n"
  },
  {
    "value": "%TRACETYPE%",
    "score": 1,
    "meta": "The type of the result.\n\nCan be one of the following values:\n\n* `TILE`\n* `PLAYER`\n* `ENTITY`\n* `NONE`"
  },
  {
    "value": "%TRACEUUID%",
    "score": 1,
    "meta": "Returns the UUID of other players."
  },
  {
    "value": "%TRACEX%",
    "score": 1,
    "meta": "X position"
  },
  {
    "value": "%TRACEY%",
    "score": 1,
    "meta": "Y position"
  },
  {
    "value": "%TRACEZ%",
    "score": 1,
    "meta": "Z position"
  },
  {
    "value": "TYPE(<text>);",
    "score": 1,
    "meta": "Injects the specified key sequence directly into the keyboard buffer at a rate of 1 key per tick"
  },
  {
    "value": "UCASE(<input>,[&output]);",
    "score": 1,
    "meta": "Converts the input string to upper case and stores it in output.\r\n\r\nReturns the output."
  },
  {
    "value": "UNIMPORT();",
    "score": 1,
    "meta": "Remove the specified configuration overlay if active"
  },
  {
    "value": "%UNIQUEID%",
    "score": 1,
    "meta": "Returns a new UUID everytime it is accessed."
  },
  {
    "value": "UNSAFE(<executions>);",
    "score": 1,
    "meta": "Begins an `UNSAFE` block with maximum executions set to `<executions>`.\n\n`<executions>` has to be betweem `0` and `10000`. Default is `100`."
  },
  {
    "value": "UNSET(<flag>);",
    "score": 1,
    "meta": "Un-sets the specified `<flag>` variable."
  },
  {
    "value": "UNSPRINT();",
    "score": 1,
    "meta": "Sets the player state to not sprinting"
  },
  {
    "value": "UNTIL(<condition>);",
    "score": 1,
    "meta": "Completes a loop started with DO but exits the loop if `<condition>` is met."
  },
  {
    "value": "%UUID%",
    "score": 1,
    "meta": "UUID of the Player"
  },
  {
    "value": "%VARNAME%",
    "score": 1,
    "meta": "Contains the variable name."
  },
  {
    "value": "%VEHICLE%",
    "score": 1,
    "meta": "Vehicle type\n\nCan be one of the following values:\n\n* `Minecart`\n* `Boat`\n* `Horse`\n* `Mule`\n* `Skeleton Horse`\n* `Zombie Horse`\n* `Llama`\n* `Pig`"
  },
  {
    "value": "%VEHICLEHEALTH%",
    "score": 1,
    "meta": "Vehicle health"
  },
  {
    "value": "VOLUME(<value>,[category]);",
    "score": 1,
    "meta": "Sets the sound volume for the specified category.\n\n`<value>` has to be between `0` and `100`.\n\n`[category]` can be one of the following values:\n* `\"music\"`\n* `\"master\"`\n* `\"records\"`\n* `\"weather\"`\n* `\"blocks\"`\n* `\"hostile\"`\n* `\"neutral\"`\n* `\"players\"`\n* `\"ambient\"`\n\n"
  },
  {
    "value": "WAIT(<time>);",
    "score": 1,
    "meta": "Pauses the script for the time (in seconds) specified, suffix `ms` for a wait in milliseconds or `t` to wait in ticks."
  },
  {
    "value": "WALKTO(<x>,<y>,<z>,[speed],[radius]);",
    "score": 1,
    "meta": "Was never offically in the mod."
  },
  {
    "value": "%WEATHERVOLUME%",
    "score": 1,
    "meta": "Volume level for Weather"
  },
  {
    "value": "WHILE(<condition>);",
    "score": 1,
    "meta": "Completes a loop started with DO but exits the loop if `<condition>` is not met"
  },
  {
    "value": "%XP%",
    "score": 1,
    "meta": "Current amount of experience points"
  },
  {
    "value": "%XPOS%",
    "score": 1,
    "meta": "Position in X direction"
  },
  {
    "value": "%XPOSF%",
    "score": 1,
    "meta": "The position in X direction with three decimal places after the comma as a string."
  },
  {
    "value": "%YAW%",
    "score": 1,
    "meta": "Yaw of the player"
  },
  {
    "value": "%YPOS%",
    "score": 1,
    "meta": "Position in Y direction"
  },
  {
    "value": "%YPOSF%",
    "score": 1,
    "meta": "The position in Y direction with three decimal places after the comma as a string."
  },
  {
    "value": "%ZPOS%",
    "score": 1,
    "meta": "Position in Z direction"
  },
  {
    "value": "%ZPOSF%",
    "score": 1,
    "meta": "The position in Z direction with three decimal places after the comma as a string."
  }
]
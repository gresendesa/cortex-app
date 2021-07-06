import React, { useState, useEffect, useRef } from 'react';

export default function translateTriggerGroup(group){

	return group=="opening" ? "before" : (group=="main" ? "loop" : "after")

}

export function translateGroupsToIntegers(group){
	return group=="opening" ? 0 : (group=="main" ? 1 : 2)
}

export function translateIntegersToGroups(int){
	return int==0 ? "opening" : (int==1 ? "main" : "ending")
}

export const usePrevious = (value) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]); 
	return ref.current;
}

export const timeDifference = (timestamp) => {

	var date1 = new Date();
	var date2 = new Date(timestamp * 1000);

		var difference = date1.getTime() - date2.getTime();

		var daysDifference = Math.floor(difference/1000/60/60/24);
		difference -= daysDifference*1000*60*60*24

		var hoursDifference = Math.floor(difference/1000/60/60);
		difference -= hoursDifference*1000*60*60

		var minutesDifference = Math.floor(difference/1000/60);
		difference -= minutesDifference*1000*60

		var secondsDifference = Math.floor(difference/1000);

		const daysPart = daysDifference > 0 ? `${daysDifference}d `: '';
		const hoursPart = hoursDifference > 0 ? `${hoursDifference}h `: '';
		const minutesPart = minutesDifference > 0 ? `${minutesDifference}min `: '';

		return `${daysPart}${hoursPart}${minutesPart}${secondsDifference}sec`;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const handleJump = ({ line, word, editor, sourceLineNumber, handle=null }) => {
	const gotoRegexString = `[Gg][Oo][Tt][Oo] ?-> ?${escapeRegExp(word)}\\b`
	const hereRegexString = `[Hh][Ee][Rr][Ee] ?<- ?${escapeRegExp(word)}\\b`
	if(line.match(new RegExp(gotoRegexString))){
		const lines = editor.session.doc.getAllLines()
		var lineNumber = sourceLineNumber + 1;
		for (var i = 0; i < lines.length; i++) {
			if(lines[i].match(new RegExp(hereRegexString))){
				lineNumber = i + 1;
				editor.getSelection().clearSelection();
				editor.gotoLine(lineNumber, lines[i].length, true);
				if(handle!==null){
					handle({lineNumber: sourceLineNumber + 1, line: line})
				}
				break
			}
		}
	} 
}

export const onLoadAce = ({ editorMode, setInfoButtonSubject, completer, setBackline }) => {



	const onload = (editor) => {


		editor.setOptions({
			fontFamily: "Monospace",
			fontSize: "15.5pt"
		});

		editor.focus();
		editor.setValue(editor.getValue(), -1);
		editor.completers = [editor.completers[0],editor.completers[1],completer];
		editor.getSession().setMode(editorMode);

		editor.getSession().getSelection().on('changeSelection',(delta)=>{
			
			setTimeout(() => {
				const selectedText = editor.getSession().getTextRange();
				if(selectedText.length!=0){
					const start = editor.getSelectionRange().start.row;
					const end = editor.getSelectionRange().end.row;
					if(start==end){
						var wholelinetxt = editor.session.getLine(start);
						setInfoButtonSubject({line: wholelinetxt, word: selectedText});
						handleJump({line: wholelinetxt, word: selectedText, editor: editor, sourceLineNumber: start, handle: setBackline})
					}
				}
			}, 1);

		});
	}

	return onload;
}


export const editorThemer = () => {

	const getListThemes = () => {
		return [
			{name: 'ambiance', label: 'Ambiance'},
			{name: 'chaos', label: 'Chaos'},
			{name: 'chrome', label: 'Chrome'},
			{name: 'clouds', label: 'Clouds'},
			{name: 'clouds_midnight', label: 'Clouds Midnight'},
			{name: 'cobalt', label: 'Cobalt'},
			{name: 'crimson_editor', label: 'Crimson Editor'},
			{name: 'dawn', label: 'Dawn'},
			{name: 'dracula', label: 'Dracula'},
			{name: 'dreamweaver', label: 'Dreamweaver'},
			{name: 'eclipse', label: 'Eclipse'},
			{name: 'github', label: 'Github'},
			{name: 'gob', label: 'Gob'},
			{name: 'gruvbox', label: 'Gruvbox'},
			{name: 'idle_fingers', label: 'Idle Fingers'},
			{name: 'iplastic', label: 'IPlastic'},
			{name: 'katzenmilch', label: 'Katzenmilch'},
			{name: 'kr_theme', label: 'KR'},
			{name: 'kuroir', label: 'Kuroir'},
			{name: 'merbivore', label: 'Merbivore'},
			{name: 'merbivore_soft', label: 'Merbivore Soft'},
			{name: 'mono_industrial', label: 'Mono Industrial'},
			{name: 'monokai', label: 'Monokai (default)'},
			{name: 'nord_dark', label: 'Nord Dark'},
			{name: 'pastel_on_dark', label: 'Pastel On Dark'},
			{name: 'solarized_dark', label: 'Solarized Dark'},
			{name: 'solarized_light', label: 'Solarized Light'},
			{name: 'sqlserver', label: 'SQLServer'},
			{name: 'terminal', label: 'Terminal'},
			{name: 'textmate', label: 'Textmate'},
			{name: 'tomorrow', label: 'Tomorrow'},
			{name: 'tomorrow_night', label: 'Tomorrow Night'},
			{name: 'tomorrow_night_blue', label: 'Tomorrow Night Blue'},
			{name: 'tomorrow_night_bright', label: 'Tomorrow Night Bright'},
			{name: 'tomorrow_night_eighties', label: 'Tomorrow Night Eighties'},
			{name: 'twilight', label: 'Twilight'},
			{name: 'vibrant_ink', label: 'Vibrant Ink'},
			{name: 'xcode', label: 'XCode'}
		]
	}

	const updateTheme = (context, AceEditor, name) => {
		localStorage.setItem(`rocket:editor:theme:${context}`,name);
		AceEditor.setTheme(`ace/theme/${name}`);
	}

	const loadTheme = (context) => {

		let theme = localStorage.getItem(`rocket:editor:theme:${context}`);

		if(theme !== null){
			return theme
		}

		return 'monokai'
	}

	return {

		getListThemes,
		updateTheme,
		loadTheme

	}

}
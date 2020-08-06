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

export const onLoadAce = ({ editorMode, setInfoButtonSubject, completer }) => {
	
	const onload = (editor) => {
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
						setInfoButtonSubject({text: wholelinetxt});
					}
				}
			}, 50);

		});
	}

	return onload;
}
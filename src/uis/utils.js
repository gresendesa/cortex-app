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
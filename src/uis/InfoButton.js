import React, { useState, useEffect } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import IconTipButton from './IconTipButton';

export default function InfoButton({ subject, callback }) {

	const [popUp, setPopUp] = useState(false);
	const [target, setTarget] = useState(null);
	const [tip, setTip] = useState('');
	const [projectName, setProjectName] = useState(null);
	const [code, setCode] = useState(null);

	const checkText = (input) => {
		const groups = null;

		const infoRoutes = [
			{
				pattern: /[^"']*(?:[{*]+)\s* (?:import|include|extends) ["'](.+)["']\s*(?:[}*]+).*/,
				type: 'template'
			}
		]

		for (var i = 0; i < infoRoutes.length; i++) {
			const groups = input.match(infoRoutes[i].pattern);
			if(groups){
				setTarget({
					type: infoRoutes[i].type,
					argument: groups[1]
				});
				setTip(`See info about '${groups[1]}' template!`);
				return true;
			}
		}
		return false;
	}

	useEffect(() => {
		if((subject!==null) && (checkText(subject.text))){
			setPopUp(true);
			setTimeout(() => {
				setPopUp(false);
			}, 3000);
		}
	}, [subject]);

	const handleClick = () => {
		setPopUp(false);
		callback(target);
	}

	return (
		<React.Fragment>
			{popUp && <IconTipButton edge="start" tip={tip} color="inherit" onClick={handleClick} aria-label="close">
				<InfoIcon />
			</IconTipButton>}
		</React.Fragment>
	);

}

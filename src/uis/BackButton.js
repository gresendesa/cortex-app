import React, { useState, useEffect } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconTipButton from './IconTipButton';
import BuildPanel from './BuildPanel';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function BackButton({ backline, setBackline, aceEditor }) {

	const [tip, setTip] = useState('');
	const [popUp, setPopUp] = useState(false);

	useEffect(() => {
		if(backline !== null){
			setPopUp(true)
			/*setTimeout(() => {
				if(backline !== null){
					setBackline(null)
					setPopUp(false)
				}	
			}, 10000)*/
		}
	},[backline])

	const handleClick = () => {
		let editor = aceEditor.current.editor
		editor.getSelection().clearSelection();
		editor.gotoLine(backline.lineNumber, backline.line.length, true);
		setBackline(null)
		setPopUp(false)
	}

	return (
		<React.Fragment>
			{popUp && <IconTipButton tip={`Back to line ${backline !== null ? backline.lineNumber : '0'}`}>
				<ArrowBackIcon onClick={handleClick} />
			</IconTipButton>}
		</React.Fragment>
	);

}

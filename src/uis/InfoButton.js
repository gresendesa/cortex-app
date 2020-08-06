import React, { useState, useEffect } from 'react';

import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import IconTipButton from './IconTipButton';
import BuildPanel from './BuildPanel';
import CircularProgress from '@material-ui/core/CircularProgress';

import TemplateInfoDialog from './TemplateInfoDialog';

export default function InfoButton({ subject, sourcesHook, editorMode, error_alert=(window.alert) }) {

	const [infoTemplateOpen, setInfoTemplateOpen] = useState(false);
	const [infoTemplateCodeOpen, setInfoTemplateCodeOpen] = useState(false);
	const [infoTemplate, setInfoTemplate] = useState({});
	const [processing, setProcessing] = useState(false);


	const onTemplateCode = (code) => {
		setInfoTemplateCodeOpen(true);
	}


	const [popUp, setPopUp] = useState(false);
	const [target, setTarget] = useState(null);
	const [tip, setTip] = useState('');
	const [projectName, setProjectName] = useState(null);
	const [code, setCode] = useState(null);

	const checkText = (input) => {
		const groups = null;

		const infoRoutes = [
			{
				pattern: /[^"']*(?:[{*]+)\s* (?:import|include|extends) ["'](.+)["']\s*.*\s*(?:[}*]+).*/,
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
				setTip(`Details about '${groups[1]}' template!`);
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
		setProcessing(true);
		//callback(target);
		const { getTemplateInfo } = sourcesHook();

		if(target.type=="template"){

	      const parts = target.argument.split('.');
	      var library_name = null;
	      var template_name = null;

	      const success = (message) => {
	      	setProcessing(false);
	        setInfoTemplate(message.detail);
	        setInfoTemplateOpen(true); 
	      }

	      const error = (message) => {
	      	setProcessing(false);
	        error_alert(message);
	      }

	      if(parts.length==3){
	        library_name = `${parts[0]}.${parts[1]}`;
	        template_name = parts[2];
	        getTemplateInfo({library: library_name, name: template_name, success, error });
	      } else if(parts.length==2) {
	        library_name = parts[0];
	        template_name = parts[1];
	        getTemplateInfo({library: library_name, name: template_name, success, error });
	      } else {
	        error_alert('Invalid template name');
	      }

	    }

	}

	return (
		<React.Fragment>
			{popUp && <IconTipButton edge="start" tip={tip} color="inherit" onClick={handleClick} aria-label="close">
				<InfoTwoToneIcon />
			</IconTipButton>}

			{processing && <CircularProgress size={30} />}

			<TemplateInfoDialog open={infoTemplateOpen} setOpen={setInfoTemplateOpen} template={infoTemplate} showCodeHandler={onTemplateCode} />

			<BuildPanel editorMode={editorMode} open={infoTemplateCodeOpen} setOpen={setInfoTemplateCodeOpen} code={infoTemplate.code} projectName={infoTemplate.dev + ' • ' + infoTemplate.library + ' • ' + infoTemplate.name}/>
		
		</React.Fragment>
	);

}

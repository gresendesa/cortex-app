import React, { useState, useEffect } from 'react';

import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import IconTipButton from './IconTipButton';
import BuildPanel from './BuildPanel';
import CircularProgress from '@material-ui/core/CircularProgress';

import TemplateInfoDialog from './TemplateInfoDialog';

import GorlemCommandInfo from './GorlemCommandInfo';

import axios from 'axios';

export default function InfoButton({ subject, sourcesHook, editorMode, project=null, error_alert=(window.alert) }) {

	const [infoTemplateOpen, setInfoTemplateOpen] = useState(false);
	const [infoTemplateCodeOpen, setInfoTemplateCodeOpen] = useState(false);
	const [infoTemplate, setInfoTemplate] = useState({});
	const [processing, setProcessing] = useState(false);

	const [commandDocOpen, setCommandDocOpen] = useState(false);
	const [commandDoc, setCommandDoc] = useState({});

	const onTemplateCode = (code) => {
		setInfoTemplateCodeOpen(true);
	}

	const [popUp, setPopUp] = useState(false);
	const [target, setTarget] = useState(null);
	const [tip, setTip] = useState('');
	const [projectName, setProjectName] = useState(null);
	const [code, setCode] = useState(null);

	const checkInput = (input) => {
		const groups = null;
		const line = input.line;
		const word = input.word;

		const infoRoutes = [
			{
				pattern: /[^"']*(?:[{*]+)\s* (?:import|include|extends) ["'](.+)["']\s*.*\s*(?:[}*]+).*/,
				type: 'template'
			},
			{

				pattern: new RegExp("^(arraysize|bind|bindgui|break|calcyawto|camera|chatfilter|chatheight|"+
						 "chatheightfocused|chatopacity|chatscale|chatvisible|chatwidth|clearchat|"      	+
						 "clearcrafting|config|craft|craftandwait|dec|decode|disconnect|do|echo|"        	+
						 "else|elseif|encode|exec|filter|fog|for|foreach|fov|gamma|getid|getidrel|"      	+
						 "getiteminfo|getproperty|getslot|getslotitem|gui|if|ifbeginswith|ifcontains|"   	+
						 "ifendswith|ifmatches|iif|import|inc|indexof|inventorydown|inventoryup|"        	+
						 "isrunning|join|key|keydown|keyup|lcase|log|lograw|logto|look|looks|match|"     	+
						 "modify|music|pass|pick|placesign|playsound|pop|popupmessage|press|prompt|"     	+
						 "push|put|random|regexreplace|reloadresources|repl|replace|resourcepacks|"      	+
						 "respawn|sensitivity|set|setlabel|setproperty|setres|setslotitem|shadergroup|"  	+
						 "showgui|slot|slotclick|split|sprint|sqrt|stop|store|storeover|strip|time|"     	+
						 "title|toast|toggle|togglekey|trace|type|ucase|unimport|unsafe|unset|unsprint|" 	+
						 "until|volume|wait|while)$",'i'),
				type: 'command'

			}
		]

		for (var i = 0; i < infoRoutes.length; i++) {
			if(infoRoutes[i].type=='template'){
				const groups = line.match(infoRoutes[i].pattern);
				if(groups){
					setTarget({
						type: infoRoutes[i].type,
						argument: groups[1]
					});
					setTip(`Details about '${groups[1]}' template!`);
					return true;
				}
			} else if(infoRoutes[i].type=='command'){
				const groups = word.match(infoRoutes[i].pattern);
				if(groups){
					setTarget({
						type: infoRoutes[i].type,
						argument: groups[1].toLowerCase()
					});
					setTip(`Checkout documentation for the '${groups[1]}' command!`);
					return true;
				}
			}
		}
		                                               
		return false;
	}

	useEffect(() => {
		if((subject!==null) && (checkInput(subject))){
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
		const { getTemplateInfo, getDoc } = sourcesHook();

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
	        if((project)&&(project.id)){
	        	getTemplateInfo({library: library_name, name: template_name, project_id:project.id, success, error });
	        }
	      } else {
	        error_alert('Invalid template name');
	      }

	    } else if(target.type=="command"){

	    	const success = (message) => {
	    		setProcessing(false);
	    		setCommandDoc(message.detail);
	    		setCommandDocOpen(true);
			}

			const error = (message) => {
				setProcessing(false);
				error_alert(message);
			}

	    	getDoc({ source: 'Gorlem', type:'actions', target:target.argument, success, error })
	    }

	}

	return (
		<React.Fragment>
			{popUp && <IconTipButton edge="start" tip={tip} color="inherit" onClick={handleClick} aria-label="close">
				<InfoTwoToneIcon />
			</IconTipButton>}

			{processing && <IconTipButton edge="start" tip={'wait a moment'} color="inherit" onClick={() => {}} aria-label="close">
					<CircularProgress size={30} />
				</IconTipButton>}

			<TemplateInfoDialog open={infoTemplateOpen} setOpen={setInfoTemplateOpen} template={infoTemplate} showCodeHandler={onTemplateCode} />

			<GorlemCommandInfo open={commandDocOpen} setOpen={setCommandDocOpen} doc={commandDoc} />

			<BuildPanel editorMode={editorMode} open={infoTemplateCodeOpen} setOpen={setInfoTemplateCodeOpen} code={infoTemplate.code} projectName={infoTemplate.dev + ' • ' + infoTemplate.library + ' • ' + infoTemplate.name}/>
		
		</React.Fragment>
	);

}

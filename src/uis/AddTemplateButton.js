import React, { useState, useEffect } from 'react';

import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import IconTipButton from './IconTipButton';
import PublicTemplateList from './PublicTemplateList';
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function AddTemplateButton({ getPublicTemplates, addLine, successAlert }) {


	const [popUp, setPopUp] = useState(true);
	const [libraries, setLibraries] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);

	const handleDialogClose = () => {
		setOpenDialog(false)
	}


	const handleClick = () => {

		setPopUp(false);

		console.log('ata')

		//const { getPublicTemplates } = sourcesHook();

		const success = res => {
			setPopUp(true);
			setLibraries(res.templates)
		}

		const error = res => {
			setPopUp(true);
			console.log(res)
		}

		getPublicTemplates({ success, error })
		
	}

	return (
		<IconTipButton tip={'Import public resource'}>

			{popUp && <LibraryAdd onClick={handleClick}/>}

			{!popUp && <CircularProgress size={30} />}

			<PublicTemplateList onClose={handleDialogClose} libraries={libraries} addLine={addLine} setLibraries={setLibraries} successAlert={successAlert}/>

		</IconTipButton>
	);

}

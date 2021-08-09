import PaletteIcon from '@material-ui/icons/Palette';


import React, { useState, useEffect } from 'react';

import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import IconTipButton from './IconTipButton';
import EditorThemeList from './EditorThemeList';
import PublicTemplateList from './PublicTemplateList';
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function ChangeThemeButton(props) {


	const [popUp, setPopUp] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const handleDialogClose = () => {
		setOpenDialog(false)
	}

	const handleClick = () => {
		setPopUp(true);
		//console.log('opba')
	}

	return (
		<IconTipButton tip={'Tony\'s themes'}>

			<PaletteIcon onClick={handleClick}/>
			
			<EditorThemeList setOpen={setPopUp} open={popUp} theme={props.theme} setTheme={props.setTheme} context={props.context} />

		</IconTipButton>
	);

}

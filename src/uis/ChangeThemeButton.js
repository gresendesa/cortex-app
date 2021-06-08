import PaletteIcon from '@material-ui/icons/Palette';


import React, { useState, useEffect } from 'react';

import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import IconTipButton from './IconTipButton';
import PublicTemplateList from './PublicTemplateList';
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function ChangeThemeButton({ setThemeName }) {


	const [popUp, setPopUp] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);

	const handleDialogClose = () => {
		setOpenDialog(false)
	}

	const handleClick = () => {

		setPopUp(false);

		const success = res => {
			setPopUp(true);
		}

		const error = res => {
			setPopUp(true);
			console.log(res)
		}

		
	}

	return (
		<IconTipButton tip={'Change editor theme'}>

			<PaletteIcon onClick={handleClick}/>
			

		</IconTipButton>
	);

}

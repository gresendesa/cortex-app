import React, { useState, useEffect } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListSubheader from '@material-ui/core/ListSubheader';

import FolderIcon from '@material-ui/icons/Folder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { editorThemer } from './utils';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const DialogTitleClose = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});



export default function ThemeDialog(props) {


  const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    accord: {
      width: '400px',
    }

  }));

  const classes = useStyles();
  const { onClose } = props;

  const [open, setOpen] = useState(props.open);

  const [theme, setTheme] = useState(props.theme)

  const handleChangeTheme = (event) => {
    const value = event.target.value;
    setTheme(value)
    props.setTheme(value)
    //props.updateTheme(props.context, value)
  }

  useEffect(() => {
    setOpen(props.open)
  },[props.open])

  const handleClose = () => {
    props.setOpen(false)
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={'sm'} fullWidth>
      <DialogTitleClose onClose={handleClose}>
        <Typography variant={'h6'}>
          Editor themes
        </Typography>
      </DialogTitleClose>

      <FormControl variant="outlined" className={styles.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Theme</InputLabel>
        <Select
          native
          value={theme}
          onChange={handleChangeTheme}
          label="Themes"
          inputProps={{
            name: 'theme',
            id: 'outlined-age-native-simple',
          }}
        >
          {
            editorThemer().getListThemes().map((item, indice) => {
              return(
                <option value={item.name} key={indice}>{item.label}</option>
              )
            })
          }
        </Select>
      </FormControl>

      <DialogTitle>
        <Typography variant={'subtitle2'}>
          Feel free to choose a theme ^.^
        </Typography>
      </DialogTitle>
    </Dialog>
  );
}


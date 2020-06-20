import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerHeader from '../uis/DrawerHeader';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import Projects from '../Projects';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ logged, setToken }) {
  const classes = useStyles();

  var [cor, setCor] = useState("primary");

  var [openMenu, setOpenMenu] = useState(false)

  const mudarCor = () => {
    setOpenMenu(!openMenu);
    if (cor=="primary"){
      setCor("secondary");
    } else {
      setCor("primary");
    }
  }

  const history = useHistory();

  const handleRedirect = (path) => {
      history.push(path);
      setOpenMenu(!openMenu);
  }

  const logOut = () => {
    setToken(null);
    setOpenMenu(false);
    console.log('access token lost');
  }

  return (

    <div className={classes.root}>
      <AppBar position="static" color={cor}>
        <Toolbar>
          {
            logged ?
            <IconButton onClick={mudarCor} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            : ''
          }
          <Typography variant="h6" className={classes.title}>
            Cortex
          </Typography>

          {
            logged ?
            <Button color="inherit" onClick={logOut}>Logout</Button>
            : ''
          }
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={openMenu} onClose={() => {setOpenMenu(false)}} >

        <List>
          <ListItem button onClick={() => {handleRedirect("/projects")}}>
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary="My Projects" />
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={logOut}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

      </Drawer>

    </div>
  );
}

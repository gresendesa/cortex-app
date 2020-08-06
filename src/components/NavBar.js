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
import logo from '../images/logo512.png';
import Avatar from '@material-ui/core/Avatar';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import FolderIcon from '@material-ui/icons/Folder';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';


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
  avatar: {
    margin: theme.spacing(1),
  },
  tiny: {
    color: '#C0C0C0',
    fontSize: '12px',
  }
}));

export default function ButtonAppBar({ logged, setToken, username, version }) {
  const classes = useStyles();

  var [cor, setCor] = useState("primary");

  var [openMenu, setOpenMenu] = useState(false)

  const mudarCor = () => {
    setOpenMenu(!openMenu);
    /*if (cor=="primary"){
      setCor("secondary");
    } else {
      setCor("primary");
    }*/
  }

  const history = useHistory();

  const handleRedirect = (path) => {
      history.push(path);
      setOpenMenu(!openMenu);
  }

  const logOut = () => {
    setToken(null);
    setOpenMenu(false);
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
            Rocket {' '}
            <Tooltip title={version.short + ' • ' + version.release_date} aria-label="release date">
              <Link color="inherit" href="#">
              <small className={classes.tiny}>v{version.number}</small>
              </Link>
            </Tooltip>
          </Typography> 
          {
            logged ?
            <div>
              <Typography variant="caption">
              {username}
              </Typography>
              <IconButton onClick={logOut} edge="end" color="inherit" aria-label="menu">
                <ExitToAppIcon />
              </IconButton>
            </div>
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
          <ListItem button onClick={() => {handleRedirect("/libs")}}>
            <ListItemIcon>
              <FolderIcon size="small" />
            </ListItemIcon>
            <ListItemText primary="My Libraries" />
          </ListItem>
          <ListItem button onClick={logOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

      </Drawer>

    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },

}));

export default function TriggerList({ triggers }) {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
      <Grid item>
        <List className={classes.root}>
          
          {

            triggers.map((trigger, indice) => {

              return (

                <ListItem button key={indice}>
                  <ListItemAvatar>
                    <Avatar>
                      <CodeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={trigger.name} secondary="trigger" />
                </ListItem>

              ) 
            })

          }

          <ListItem button onClick={()=>{console.log("falafeu")}}>
            <ListItemAvatar>
              <Avatar className={classes.orange}>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create" secondary="new trigger" />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

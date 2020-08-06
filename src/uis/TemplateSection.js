import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteButton from './DeleteButton';

import NamespaceCreateDialog from './NamespaceCreateDialog';
import TemplateCreateDialog from './TemplateCreateDialog';
import NamespaceEditDialog from './NamespaceEditDialog';
import TemplateEditor from './TemplateEditor';
import { namespaceModel, templateModel } from '../mock/models';
import { deepOrange, green, blueGrey, indigo } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';
import SaveIcon from '@material-ui/icons/Save';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EditIcon from '@material-ui/icons/Edit';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

import AssignmentIcon from '@material-ui/icons/Assignment';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const TemplateList = withStyles((theme) => {
  return {
      root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
  }
})(List);

const useStyles = makeStyles((theme) => ({
  avatarTemplate: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },

  avatarNewTemplate: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },

  avatarNamespace: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: blueGrey[500],
  },

}));

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiExpansionPanelDetails);

const TemplateItem = ({ index, template, namespace, moveUp, deleteTemplate, updateTemplate, showAlert, getTemplateInfo, editorMode }) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  }

  return (
    <div>
      <ListItem button onClick={handleClick} >
        <ListItemAvatar>
          <Avatar className={classes.avatarTemplate}>
            <AssignmentIcon fontSize='small' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={template.name}
          
        />
        <ListItemSecondaryAction>

          {
            index>0 ?
            <IconButton edge="end" aria-label="move-up" onClick={() => moveUp(template)}>
              <ArrowUpwardIcon size="small" />
            </IconButton>
            :
            ""
          }
        
          <DeleteButton type='trigger' callback={() => deleteTemplate(template)} />

        </ListItemSecondaryAction>
      </ListItem>
      <TemplateEditor 
        open={open} 
        setOpen={setOpen} 
        template={template} 
        namespace={namespace} 
        saveTemplate={updateTemplate} 
        showAlert={showAlert} 
        editorMode={editorMode}
        getTemplateInfo={getTemplateInfo}
      />
    </div>
  )

}

const TemplatePanel = ({ index, namespace, expanded, setExpanded, handleChange, namespaceHook, getTemplateInfo, editorMode }) => {


  const classes = useStyles();
  const toggleExpanded = () => {
    if ((expanded!==index) || (expanded==null)) {
      setExpanded(index);
    } else {
      setExpanded(null);
    }
  }

  const [open, setOpen] = useState(false);

  const { deleteNamespace, moveNamespaceUp, editNamespace, isValidName, itemExists, showAlert, updateNamespace, moveItemUp } = namespaceHook();

  const createTemplate = ({ name, description }) => {
    const model = templateModel({ name, description });
    const templates = namespace.templates;
    if(isValidName(name)){
      if(!itemExists({item:model, list:templates})){
        const copyNamespace = Object.assign({}, namespace);
        copyNamespace.templates.push(model);
        updateNamespace(copyNamespace);
        return true;
      }
      showAlert({message:"This template name is already taken!"});
    } else {
      showAlert({message:"Invalid name!"});
    }
    return false;
  }

  const updateTemplate = (template, save=false, callback=()=>{}) => {
    if(isValidName(template.name)){

      const templatesExceptItself = namespace.templates.filter(t => {
        return template.id !== t.id;
      })
      if(!itemExists({item:template, list:templatesExceptItself})){
        const copyNamespace = Object.assign({}, namespace);
        const index = copyNamespace.templates.findIndex(t => {
          return t.id == template.id;
        });
        if (index>=0){
          copyNamespace.templates[index] = template;
          updateNamespace(copyNamespace, save, callback);
          return true;
        } else {
          showAlert({message:"Cannot updated something that not exists"});
        }
      }
      showAlert({message:"This template name is already taken!"});
    } else {
      showAlert({message:"Invalid name"});
    }
    callback(false);
    return false
  }

  const moveUp = (template) => {
    moveItemUp({
      item: template,
      list: namespace.templates,
      callback: (reodered_templates) => {
        const copyNamespace = Object.assign({}, namespace);
        copyNamespace.templates = reodered_templates;
        updateNamespace(copyNamespace);
      }
    })
  }

  const deleteTemplate = (template) => {
    const filtered_templates = namespace.templates.filter(t => {
      return t.id !== template.id;
    });
    const copyNamespace = Object.assign({}, namespace);
    copyNamespace.templates = filtered_templates;
    updateNamespace(copyNamespace);
  }

  return (

    <ExpansionPanel square expanded={expanded == index}>
      <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" onClick={toggleExpanded}>
        
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >

          <Grid item>
            <FolderIcon className={classes.avatarNamespace} />
          </Grid>

          <Grid item>
            <Typography>{namespace.name}</Typography>
          </Grid>

        </Grid>
            
        
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
          <Grid item>
            
            <TemplateList>
              { 

                namespace.templates.map((template, i) => {
                  return (
                    <TemplateItem 
                      key={i} 
                      index={i} 
                      namespace={namespace} 
                      template={template} 
                      moveUp={moveUp} 
                      deleteTemplate={deleteTemplate} 
                      updateTemplate={updateTemplate} 
                      showAlert={showAlert} 
                      editorMode={editorMode}
                      getTemplateInfo={getTemplateInfo}
                    />
                  )
                })

              }

              <ListItem button onClick={() => setOpen(true)}>
                <ListItemAvatar>
                  <Avatar className={classes.avatarNewTemplate}>
                    <AddIcon  />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="New template"
                />
              </ListItem>

            </TemplateList>
            <TemplateCreateDialog open={open} setOpen={setOpen} namespace={namespace} createTemplate={createTemplate} />


          </Grid>
          <Grid item>
            <BottomNavigation >
              {
                index>0 ?
                <BottomNavigationAction label="Move Up" onClick={() => moveNamespaceUp(namespace)} icon={<ArrowUpwardIcon />} />
                : ""
              }
              <BottomNavigationAction label="Edit" onClick={() => editNamespace(namespace)} icon={<EditIcon />} />
              <DeleteButton type='task' callback={() => deleteNamespace(namespace)} />
            </BottomNavigation>
          </Grid>
        </Grid>

      </ExpansionPanelDetails>
    </ExpansionPanel>

  )
}

export default function TemplateSection({ namespaces, templatesHook, getTemplateInfo, editorMode }) {

  const { setNamespaces, deleteNamespace } = templatesHook();

  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingNamespace, setEditingNamespace] = useState(false);
  const [popUpAlert, setPopUpAlert] = useState(false);
  const [alert, setAlert] = useState({ message:'', severity:'warning'});
  const [processing, setProcessing] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showAlert = ({ message, severity='warning' }) => {
    setAlert({
      message,
      severity
    });
    setPopUpAlert(true);
  } 

  const handleClick = () => {
    setOpen(true);
  }

  const isValidName = (name) => {
    if(name.match(/^[a-zA-Z0-9_-áéíóúçÁÉÍÓÚÇàèìòùÀÈÌÒÙ]+$/)){
      return true;
    }
    return false;
  }

  const itemExists = ({ item, list=namespaces }) => {
    return list.some(n => {
      return (n.id == item.id || n.name == item.name);
    });
    return false;
  }

  const createNamespace = ({ name, description }) => {
    if(isValidName(name)){
      const model = namespaceModel({ name, description });
      if(!itemExists({ item:model })){
        const copyNamespaces = Object.assign([], namespaces);
        copyNamespaces.push(model);
        setNamespaces(copyNamespaces);
        setOpen(false);
        return true
      }
      showAlert({message: "Namespace already exists"});
    } else {
      showAlert({message: "Invalid name"});
    }
    return false;
      
  }

  const updateNamespace = (namespace, save=false, callback=()=>{}) => {
    if(isValidName(namespace.name)){
      const copyNamespaces = Object.assign([], namespaces);
      const index = copyNamespaces.findIndex(n => {
        return n.id == namespace.id;
      });
      if (index>=0){
        const namespacesExceptItself = copyNamespaces.filter(n => {
          return n.id !== namespace.id;
        });
        if(!itemExists({ item:namespace, list:namespacesExceptItself })){
          copyNamespaces[index] = namespace;
          setNamespaces(copyNamespaces, save, callback);
          return true;
        }
        showAlert({message: "Namespace already exists"});
      }
    } else {
      showAlert({message: "Invalid name"});
    }
    callback(false);
    return false;
      
  }

  const editNamespace = (namespace) => {
    setEditingNamespace(namespace);
    setOpenEdit(true);
  }

  const handleSave = () => {

    const callback = (ok, message) => {
      setProcessing(false);
      if(ok){
        showAlert({message: "Saved", severity: "success"});
      } else {
        showAlert({message, severity: "error"});
      }
    }
    setProcessing(true);
    setNamespaces(namespaces, true, callback);
  }

  const moveItemUp = ({ item, list, callback }) => {
    const copyList = Object.assign([], list);
    const index = copyList.findIndex(n => {
      return n.id == item.id;
    });
    if(index>0){
      const aboveItem = copyList[index-1];
      copyList[index-1] = copyList[index];
      copyList[index] = aboveItem;
      callback(copyList);
    }
  }

  const moveNamespaceUp = (namespace) => {
    moveItemUp({
      item: namespace,
      list: namespaces,
      callback: (reodered_namespaces) => {
        setNamespaces(reodered_namespaces);
        setExpanded(expanded-1);
      }
    });
  }

  const handleDeleteNamespace = (namespace) => {
    deleteNamespace(namespace);
    setExpanded(null);
  }

  const namespaceHook = () => {
    return {
      createNamespace,
      updateNamespace,
      moveNamespaceUp,
      deleteNamespace: handleDeleteNamespace,
      editNamespace,
      showAlert,
      isValidName,
      itemExists,
      setNamespaces,
      moveItemUp
    }
  }

  return (
    <div>
      {processing && <LinearProgress color="secondary" />}
      <Grid container
          direction="row"
          justify="space-between"
          alignItems="center">
          
          <Grid item>
            <Box component="span" m={1}>
              <Typography variant="h5" color="secondary">
                My Libraries
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box component="span" m={1}>
              <Typography>
                <IconButton disabled={processing} onClick={handleSave} aria-label="save templates" >
                  <SaveIcon />
                </IconButton>
                <IconButton disabled={processing} onClick={handleClick} aria-label="add library" >
                  <AddIcon  />
                </IconButton>
              </Typography>
            </Box>

          </Grid>

        </Grid>

      {
        namespaces.length > 0 ?
        namespaces.map((namespace, i) => {
          return (
            <TemplatePanel 
              key={i} 
              index={i} 
              namespace={namespace} 
              expanded={expanded} 
              setExpanded={setExpanded} 
              handleChange={handleChange}
              namespaceHook={namespaceHook}
              editorMode={editorMode}
              getTemplateInfo={getTemplateInfo}
            />
          )
        })
        :
        <Alert severity="info">
          <AlertTitle>No templates loaded</AlertTitle>
        </Alert>
      }
      <NamespaceCreateDialog open={open} setOpen={setOpen} createNamespace={createNamespace} />
      <NamespaceEditDialog open={openEdit} setOpen={setOpenEdit} namespace={editingNamespace} updateNamespace={updateNamespace} />
      <Snackbar open={popUpAlert} autoHideDuration={4000} onClose={() => setPopUpAlert(false)} >
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconTipButton from './uis/IconTipButton';
import SaveIcon from '@material-ui/icons/Save';
import { Icon } from 'semantic-ui-react';
import CodeIcon from '@material-ui/icons/Code';
import Indenter from './Indenter';
import DrawerHeader from './uis/DrawerHeader';
import TextField from '@material-ui/core/TextField';
import SettingsIcon from '@material-ui/icons/Settings';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import SharingArea from './uis/SharingArea';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

//import { cortexMacroModCommands } from './data/CortexMacroModCommands';
import { plainCortexMacroModCommands } from './data/PlainCortexMacroModCommands';

import InfoButton from './uis/InfoButton';
import BuildPanel from './uis/BuildPanel';

import { onLoadAce } from './uis/utils';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#00352c',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
  },
  actionButton: {
    marginLeft: theme.spacing(0.05),
  },
  containerEditor: {
    backgroundColor: '#2f3129',
    height:'100vh',
  },
  editor: {
    height:'80vh',
  },
  events: {
    backgroundColor: 'inherit',
  },
  toolBar: {
    backgroundColor: 'gray',
  },
  breadCrumb: {
    marginRight: theme.spacing(1),
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Editor({ project, saveMacro, getBuild, getTemplateInfo, getDoc, alert, editorMode, addCollaborator, removeCollaborator, updateCollaborators }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [openConfig, setOpenConfig] = useState(false);

  const [name, setName] = useState(project.macro.name);
  const [code, setCode] = useState(project.macro.code);
  const [csid, setCsid] = useState(project.macro.csid);
  const [isOnChat, setIsOnChat] = useState(project.macro.type == 'onChat');
  const [description, setDescription] = useState(project.macro.description); 
  const [processing, setProcessing] = useState(false);
  const [indentSwitch, setIndentSwitch] = useState(false);

  const [infoButtonSubject, setInfoButtonSubject] = useState(null);
  const infoSourcesHook = () => {
    return {
      getTemplateInfo:getTemplateInfo,
      getDoc: getDoc
    }
  }

  const [build, setBuild] = useState({
    open: false,
    code: ''
  });

  const setBuildOpen = (bool) => {
    const copyBuild = Object.assign({},build);
    copyBuild.open = bool;
    setBuild(copyBuild)
  }

  const history = useHistory();

  const backProjects = (path) => {
      history.push("/projects");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleIndent = (e) => {
    const lines = code.split('\n');
    const indenter = new Indenter(lines);
    var result = null;
    if(indentSwitch){
      result = indenter.indent('    ');
    } else {
      result = indenter.indent();
    }
    setCode(result);
    setIndentSwitch(!indentSwitch);
  }

  const handleClose = () => {
    setOpen(false);
  };

   const onConfigClose = () => {
    setOpenConfig(false);
  };

  const handleOpenConfig = () => {
    setOpenConfig(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCsidChange = (e) => {
    setCsid(e.target.value);
  };

  const handleTemplateCodeChange = (value) => {
    setCode(value);
  };

  const handleBuild = () => {
  	setProcessing(true);

    const success = (message) => {
    	setBuild({
    		open: true,
    		code: message.build
    	})
    	setProcessing(false);
    }

    const error = (message) => {
    	alert().show({message, severity: "error"});
    	setProcessing(false);
    }

    getBuild({ id: project.id, success, error });

  }

  const handleSave = (launch=false) => {
    const copyMacro = Object.assign({}, project.macro);
    copyMacro.name = name;
    copyMacro.code = code;
    copyMacro.csid = csid;
    copyMacro.description = description;
    copyMacro.type = isOnChat ? 'onChat' : 'Main';

    if(copyMacro.name.match(/[^a-zA-Z0-9\_-]|^$/)){

      alert().show({message: "Project name should contain just [^a-zA-Z0-9\_-] chars", severity: "error"});

    } else if (copyMacro.csid.match(/[^a-zA-Z0-9\_.-]|^$/)) {

      alert().show({message: "CloudScript id should contain just [^a-zA-Z0-9\_.-] chars", severity: "error"});

    } else {

      setProcessing(true);

      const success = (message) => {
        if(launch){
          alert().show({message: "Launched as "+csid, severity: "success"});
        } else {
          alert().show({message: "Saved", severity: "success"});
        } 
        setProcessing(false);
      }

      const error = (message) => {
        alert().show({message, severity: "error"});
        setProcessing(false);
      }

      saveMacro({ id: project.id, macro: copyMacro, launch:launch, success, error });

    }

  }

  var CortexCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
          var completions = plainCortexMacroModCommands;
          callback(null, completions);
      }
  }

  const saveButtonRef = useRef(null);
  const kodeButtonRef = useRef(null);
  const launchButtonRef = useRef(null);
  const editButtonRef = useRef(null);

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition} disableBackdropClick>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={backProjects} aria-label="close">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {name}
            </Typography>

            <Box className={classes.breadCrumb}>
              {csid}
            </Box>

            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <IconTipButton edge="end" tip="Save CTRL+S" disabled={processing} color="inherit" reference={saveButtonRef} onClick={() => handleSave(false)}>
                <SaveIcon />
              </IconTipButton>
              <IconTipButton edge="end" tip="See Kode CTRL+K" disabled={processing} color="inherit" reference={kodeButtonRef} onClick={() => {handleBuild()}}>
                <CodeIcon />
              </IconTipButton>
              <IconTipButton edge="end" tip="Launch CTRL+L" disabled={processing} color="inherit" reference={launchButtonRef}  onClick={() => handleSave(true)}>
                <Icon name='rocket' size='small' />
              </IconTipButton>
            </ButtonGroup>

          </Toolbar>
        </AppBar>
        

        <Grid container>
          <Grid 
            item container
            direction="row"
            justify="space-between"
            alignItems="center"
            sm={12}> 
            
            <Grid item>
              <IconTipButton edge="start" tip="Indent code" color="inherit" onClick={handleIndent} onDoubleClick={handleIndent} className={classes.actionButton} aria-label="close">
                <FormatAlignRightIcon />
              </IconTipButton>
              <InfoButton editorMode={editorMode} subject={infoButtonSubject} sourcesHook={infoSourcesHook} project={project} error_alert={(message) =>  alert().show({message, severity: "error"})}/>
            </Grid>

            <Grid item>
              <Box>
                <IconButton ref={editButtonRef} onClick={handleOpenConfig}>
                  <SettingsIcon fontSize="small"/>
                </IconButton>
              </Box>
            </Grid>

          </Grid>
        </Grid>

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            className={classes.containerEditor}
          >

          <Grid item xs={12} className={classes.editor}>
            <AceEditor 
              onLoad={ onLoadAce({ editorMode, setInfoButtonSubject, completer: CortexCompleter }) }
              mode="javascript"
              theme="monokai"
              value={code}
              onChange={handleTemplateCodeChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={20}
              tabSize={2}
              width="100%"
              height="100%"
              showPrintMargin={false}
              commands={[
                {   
                  name: 'save', 
                  bindKey: {win: 'Ctrl-S', mac: 'Command-S'}, 
                  exec: () => {saveButtonRef.current.click()} 
                },
                {   
                  name: 'launch', 
                  bindKey: {win: 'Ctrl-L', mac: 'Command-L'}, 
                  exec: () => {launchButtonRef.current.click()} 
                },
                {   
                  name: 'kode', 
                  bindKey: {win: 'Ctrl-K', mac: 'Command-K'}, 
                  exec: () => {kodeButtonRef.current.click()}
                },
                {   
                  name: 'props', 
                  bindKey: {win: 'Ctrl-P', mac: 'Command-P'}, 
                  exec: () => {editButtonRef.current.click()}
                }
              ]}
              setOptions={{
                enableLiveAutocompletion: true,
                enableSnippets: true,
                animatedScroll: true
              }}
            />

            <Drawer anchor="right" open={openConfig} onClose={onConfigClose} >

              <DrawerHeader onClose={onConfigClose} />

              <List aria-label="main mailbox folders">
                <ListItem>
                  <TextField margin="dense" value={name} small="small" onChange={handleNameChange} label="Project name" variant="outlined" />  
                </ListItem>
                <ListItem>
                  <TextField margin="dense" value={csid} small="small" onChange={handleCsidChange} label="CloudScript id" variant="outlined" />  
                </ListItem>
                <ListItem>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    fullWidth
                    multiline
                    variant="outlined"
                    inputProps={{ className: classes.textarea }}
                  />
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isOnChat}
                        onChange={() => {setIsOnChat(!isOnChat)}}
                        color="primary"
                      />
                    }
                    label="onChat"
                  />
                </ListItem>

                <ListItem>
                  <SharingArea project={project} addCollaborator={addCollaborator} removeCollaborator={removeCollaborator} updateCollaborators={updateCollaborators} alert={alert} />
                </ListItem>
              </List>

            </Drawer>

          </Grid>

        </Grid>


      </Dialog>

      <BuildPanel editorMode={editorMode} open={build.open} setOpen={setBuildOpen} code={build.code} projectName={name} />

      
    </div>
  );
}

class PlainMacro extends React.Component {

  state = {
    alert: {
      popUp: false,
      severity: null,
      message: null
    },
    project: this.props.project
  }

  render(){

    const updateCollaborators = (collaborators, callback) => {
      let copyProject = Object.assign([], this.state.project);
      copyProject.collaborators = collaborators
      this.setState({'project': copyProject}, callback)
    }

		const alertHook = () => {
			return ({ 
				show: ({ message, severity }) => {
					this.setState({
						alert: {
							popUp: true,
							severity: severity,
							message: message
						}
					})
				},
				close: () => {
					this.setState({
						alert: {
							popUp: false
						}
					})
				}
			})
		}

		return (
			<div>
				<Editor 
					project={this.state.project} 
					saveMacro={this.props.saveMacro} 
					getBuild={this.props.getBuild} 
          getTemplateInfo={this.props.getTemplateInfo} 
          getDoc={this.props.getDoc}
					alert={alertHook}
          editorMode={this.props.editorMode}
          addCollaborator={this.props.addCollaborator}
          removeCollaborator={this.props.removeCollaborator}
          getCollaborators={this.props.getCollaborators}
          updateCollaborators={updateCollaborators}
				/>
				<Snackbar open={this.state.alert.popUp} autoHideDuration={4000} onClose={alertHook().close} >
					<MuiAlert elevation={6} variant="filled" severity={this.state.alert.severity}>
					{this.state.alert.message}
					</MuiAlert>
				</Snackbar>
			</div>
		);

	}

}
export default PlainMacro;
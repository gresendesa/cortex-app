import React, { useRef, useState, useEffect } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
import Select from '@material-ui/core/Select';

import SharingArea from './uis/SharingArea';

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

//import { cortexMacroModCommands } from './data/CortexMacroModCommands';
import { plainCortexMacroModCommands } from './data/PlainCortexMacroModCommands';

import InfoButton from './uis/InfoButton';
import BackButton from './uis/BackButton';
import BuildPanel from './uis/BuildPanel';
import DownloadLocalServer from './uis/DownloadLocalServer';
import AddTemplateButton from './uis/AddTemplateButton';
import ChangeThemeButton from './uis/ChangeThemeButton';


import { onLoadAce, editorThemer } from './uis/utils';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/ext-language_tools";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';

import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#618833',
  },
  
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
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
  },
  formControl: {
    paddingTop: '8px',
    fontSize: '5px'
  },

  serverOffline: {
    color: '#f1b2a8'
  },

  serverOnline: {
    color: 'inherit'
  }

}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function Editor({ project, saveMacro, getBuild, getTemplateInfo, getPublicTemplates, getDoc, alert, editorMode, addCollaborator, removeCollaborator, updateCollaborators, localServerOnline, localConnection }) {

  const classes = useStyles();
  
  const [backline, setBackline] = useState(null);//Para o botão de voltar

  const [open, setOpen] = React.useState(true);

  const [openConfig, setOpenConfig] = useState(false);

  const [name, setName] = useState(project.id);
  const [code, setCode] = useState(project.macro.code);
  const [csid, setCsid] = useState(project.id);
  const [isOnChat, setIsOnChat] = useState(project.macro.type == 'onChat');
  const [description, setDescription] = useState(project.macro.description); 
  const [processing, setProcessing] = useState(false);
  const [indentSwitch, setIndentSwitch] = useState(false);
  const [isPublic, setIsPublic] = useState(project.macro.public ? true : false);
  const [type, setType] = useState(project.macro.type)

  const [downloadOpen, setDownloadOpen] = useState(false)

  const themeContext = 'plainmacro';
  const [theme, setTheme] = useState(editorThemer().loadTheme(themeContext));
  const updateTheme = (theme) => {
    editorThemer().updateTheme(themeContext, aceEditor.current.editor, theme)
  }

  const [isServerOnline, setIsServerOnline] = useState(localServerOnline);

  useEffect(() => {
    if(isServerOnline){
      alert().show({message: 'Rocket Local Server is now online!', severity: "success"});
      setDownloadOpen(false);
    } /*else {
      alert().show({message: 'Rocket Local Server is offline!', severity: "info"});
    }*/
  },[isServerOnline])

  useEffect(() => {
    setIsServerOnline(localServerOnline, () => {
      
    });
  },[localServerOnline]);

  const [infoButtonSubject, setInfoButtonSubject] = useState(null);
  const [backButton, setBackButton] = useState(null);
  const infoSourcesHook = () => {
    return {
      getTemplateInfo:getTemplateInfo,
      getDoc: getDoc
    }
  }

  const onChangeType = (e) => {
    const value = e.target.value;
    if(value.length>0){
      setType(value);
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

  const goToLogin = (path) => {
    history.push("/login");
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

    getBuild({ macro: project.macro, success, error });

  }

  const handleAddTemplate = () => {
    //console.log("opa")
  }
  
  const saveMacroOnLocalHost = ({ name, macro, success = () => {}, error = () => {} }) => {

    let payload = JSON.stringify({'macro': macro, 'name': name });

    //console.log(payload);

    localConnection.post('/saveMacro',payload)
    .then(r => {
      if(r.status < 300){
        success(r)
      } else {
        if(r.data.directory.length == 0){
          error(`Go to Rocket Local Server, select a directory and try again!`)
        } else {
          error(`Unable to save "${r.data.file}" on "${r.data.directory}"`)
        }
      }
    })
    .catch(r => {
      error('Unable to save: network error')
    })
  }

  const handleSave = (launch=false) => {
    //launch = false
    const copyMacro = Object.assign({}, project.macro);
    copyMacro.name = name;
    copyMacro.code = code;
    copyMacro.csid = name;
    copyMacro.description = description;
    //copyMacro.type = isOnChat ? 'onChat' : 'Main';
    copyMacro.type = type;
    copyMacro.public = isPublic;

    if(copyMacro.name.match(/[^a-zA-Z0-9À-ÿ·•\_-]|^$/)){

      alert().show({message: "Script name should contain just [^a-zA-Z0-9À-ÿ·•\_-] chars", severity: "error"});

    } else if (copyMacro.csid.match(/[^a-zA-Z0-9\_.-]|^$/)) {

      alert().show({message: "CloudScript id should contain just [^a-zA-Z0-9\_.-] chars", severity: "error"});

    } else {

      setProcessing(true);

      const success = (message) => {

        if(launch){
          if(type !== 'Main'){
            alert().show({message: "Launched as "+name+".txt"+" ("+type+")", severity: "success"});
          } else {
            alert().show({message: "Launched as "+name+".txt", severity: "success"});
          }
        } else {
          alert().show({message: "Saved", severity: "success"});
        } 
        setProcessing(false);

        const tempProj = JSON.parse(localStorage.getItem('localMacro'))
        project.macro = tempProj.macro
        project.name = tempProj.id

      }

      const error = (message) => {
        alert().show({message, severity: "error"});
        setProcessing(false);
      }

      if(!launch){
        saveMacro({ id: name, macro: copyMacro, launch:launch, success, error });
      } else {


        if(!isServerOnline){
          //alert().show({message: 'The local server is not online!', severity: "error"});
          setProcessing(false);
          setDownloadOpen(true);
        } else {

          const saveLocalMacroAfter = () => {

            //console.log('ok tá salvo, agora vamos enviar para servidor!')

            getBuild({ 
              macro: project.macro, 
              success: (message) => {
                saveMacroOnLocalHost({
                  macro: message.build,
                  name: name,
                  success: success,
                  error: error
                })
              }, 
              error 
            });
          }

          saveMacro({ id: name, macro: copyMacro, launch:launch, success:saveLocalMacroAfter, error });

          

        }
      }

    }

  }

  var CortexCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
          var completions = plainCortexMacroModCommands;
          callback(null, completions);
      }
  }

  const aceEditor = useRef()

  const addLineAtCurrentPosition = line => {
    if(aceEditor.current !== undefined){
      let editor = aceEditor.current.editor
      editor.session.insert(editor.getCursorPosition(), line)
    }
  }

  useEffect(() => {
    //console.log(aceEditor)
  }, [aceEditor])

  const saveButtonRef = useRef(null);
  const kodeButtonRef = useRef(null);
  const launchButtonRef = useRef(null);
  const editButtonRef = useRef(null);

  return (
    <div>
      <DownloadLocalServer
        open={downloadOpen}
        setOpen={setDownloadOpen}
      />
      <Dialog fullScreen open={open} TransitionComponent={Transition} disableBackdropClick>
        <AppBar className={classes.appBar}>
          <Toolbar>
          <Button variant="contained" color="primary" onClick={goToLogin}>
            Log in
          </Button>

            <Typography variant="h6" className={classes.title}>
            </Typography>

            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <IconTipButton edge="end" tip="Save CTRL+S" disabled={processing} color="inherit" reference={saveButtonRef} onClick={() => handleSave(false)}>
                <SaveIcon />
              </IconTipButton>
              <IconTipButton edge="end" tip="See Kode CTRL+K" disabled={processing} color="inherit" reference={kodeButtonRef} onClick={() => {handleBuild()}}>
                <CodeIcon />
              </IconTipButton>
              <IconTipButton edge="end" tip="Launch CTRL+L" color="inherit" disabled={processing} reference={launchButtonRef}  onClick={() => handleSave(true)}>
                <Icon name='rocket' size='small' className={isServerOnline ? classes.serverOnline : classes.serverOffline} />
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

              <AddTemplateButton getPublicTemplates={getPublicTemplates} addLine={addLineAtCurrentPosition} successAlert={(message) =>  alert().show({message, severity: "success"})}/>

              <ChangeThemeButton context={themeContext} theme={theme} setTheme={updateTheme} />

              <BackButton backline={backline} setBackline={setBackline} aceEditor={aceEditor} />

              <InfoButton editorMode={editorMode} subject={infoButtonSubject} sourcesHook={infoSourcesHook} project={project} error_alert={(message) =>  alert().show({message, severity: "error"})}/>

            </Grid>

            <Grid item>
              <Box>
                <IconButton ref={editButtonRef} onClick={handleOpenConfig} disabled={(!isServerOnline) || processing}>
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
              onLoad={ onLoadAce({ editorMode, setInfoButtonSubject, completer: CortexCompleter, setBackline }) }
              mode="javascript"
              theme={theme}
              value={code}
              ref={aceEditor}
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
                  <TextField fullWidth margin="dense" value={name} small="small" onChange={handleNameChange} label="Script name" variant="outlined" />  
                </ListItem>
              </List>

            </Drawer>

          </Grid>

        </Grid>


      </Dialog>

      <BuildPanel editorMode={editorMode} open={build.open} setOpen={setBuildOpen} code={build.code} projectName={name} theme={theme} />

      
    </div>
  );
}

class PublicEditor extends React.Component {

  state = {
    alert: {
      popUp: false,
      severity: null,
      message: null
    },
    localServerOnline: false,
    project: this.props.project
  }

  localServerAddress = 'http://127.0.0.1:8081';

  getConnection = ({ post }) => {
		const instance = axios.create({
      headers: {
        post: {        // can be common or any other method
          'Content-Type': 'application/json; charset=utf-8'
        }
      },
			baseURL: this.localServerAddress,
      timeout: 500,
      validateStatus: function (status) {
        return status < 500;
      }
		});
    //if(post) instance.defaults.headers.post['Content-Type'] = 'application/json';
		return instance;
	}

  localConnection = this.getConnection(true);

  pingInterval = null;

  componentWillMount(){
    this.pingInterval = setInterval(() => {

      this.localConnection.get('/ping')
        .then(r => this.setState({'localServerOnline': r.status === 204}))
        .catch(r => this.setState({'localServerOnline': false}))
    
    }, 1000)
  }

  componentWillUnmount(){
    if(this.pingInterval !== null){
      try {
        clearInterval(this.pingInterval)
      } catch {
        console.log('error on clearing ping interval!')
      }
    }
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
          getPublicTemplates={this.props.getPublicTemplates}
          getDoc={this.props.getDoc}
					alert={alertHook}
          editorMode={this.props.editorMode}
          addCollaborator={this.props.addCollaborator}
          removeCollaborator={this.props.removeCollaborator}
          getCollaborators={this.props.getCollaborators}
          updateCollaborators={updateCollaborators}
          localServerOnline={this.state.localServerOnline}
          localConnection={this.localConnection}
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
export default PublicEditor;
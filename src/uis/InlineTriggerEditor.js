import React, { useState, useRef } from 'react';
import { Box, ButtonGroup, Drawer, FormControlLabel, IconButton, List, ListItem, Switch, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import SaveIcon from '@material-ui/icons/Save';
import { Icon } from 'semantic-ui-react';

import { triggerModel, eventModel } from '../mock/models';
import { cortexMacroModCommands } from '../data/CortexMacroModCommands';
import Indenter from '../Indenter';
import { LinesGetter } from '../Indenter';
import AddTemplateButton from './AddTemplateButton';
import ChangeThemeButton from './ChangeThemeButton';
import DrawerHeader from './DrawerHeader';
import Event from './Event';
import IconTipButton from './IconTipButton';
import InfoButton from './InfoButton';
import translateTriggerGroup from './utils';
import { onLoadAce, editorThemer } from './utils';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-clouds';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-gob';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/theme-idle_fingers';
import 'ace-builds/src-noconflict/theme-iplastic';
import 'ace-builds/src-noconflict/theme-katzenmilch';
import 'ace-builds/src-noconflict/theme-kr_theme';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/theme-merbivore_soft';
import 'ace-builds/src-noconflict/theme-mono_industrial';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-pastel_on_dark';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-vibrant_ink';
import 'ace-builds/src-noconflict/theme-xcode';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  toolbar: {
    background: '#357a38',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    minHeight: 52,
    flexShrink: 0,
    gap: 4,
  },
  toolbarTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginLeft: 4,
  },
  toolbarBreadcrumb: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginRight: 8,
    flexShrink: 0,
    maxWidth: '30vw',
  },
  secondaryBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 4px',
    background: '#1a1c18',
    flexShrink: 0,
    borderBottom: '1px solid #333',
  },
  editorArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#2f3129',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function InlineTriggerEditor({
  project,
  task,
  trigger,
  group,
  onClose,
  onSave,
  onCodeChange,
  loading,
  getActionCode,
  getTemplateInfo,
  getDoc,
  editorMode,
  getPublicTemplates,
  alert,
}) {
  const classes = useStyles();

  const [events, setEvents] = useState(() => Object.assign([], trigger.events));
  const [openEvents, setOpenEvents] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [name, setName] = useState(trigger.name);
  const actionRef = useRef(trigger.action);
  const [blocking, setBlocking] = useState(trigger.blocking);
  const [deploying, setDeploying] = useState(false);
  const [indentSwitch, setIndentSwitch] = useState(false);
  const [infoButtonSubject, setInfoButtonSubject] = useState(null);

  const themeContext = 'trigger';
  const [theme, setTheme] = useState(() => editorThemer().loadTheme(themeContext));

  const saveButtonRef = useRef(null);
  const launchButtonRef = useRef(null);
  const kodeButtonRef = useRef(null);
  const indentButtonRef = useRef(null);
  const eventsButtonRef = useRef(null);
  const editButtonRef = useRef(null);
  const aceEditor = useRef(null);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    if (aceEditor.current) {
      editorThemer().updateTheme(themeContext, aceEditor.current.editor, newTheme);
    }
  };

  const infoSourcesHook = () => ({ getTemplateInfo, getDoc });

  const hasTrigger = (t) => {
    const filtered = (task.triggers[group] || []).filter((x) => x.id !== t.id);
    return filtered.some((x) => x.name === t.name);
  };

  const handleActionChange = (newCode) => {
    actionRef.current = newCode;
    if (onCodeChange) onCodeChange(newCode);
  };

  const onSaveLocal = (publish, callback = () => {}) => {
    setDeploying(true);
    const currentAction = aceEditor.current ? aceEditor.current.editor.getValue() : actionRef.current;
    const newTrigger = triggerModel({ name, action: currentAction, id: trigger.id, blocking, events, active: trigger.active });
    if (name.match(/"|^$/)) {
      alert('Invalid name');
      setDeploying(false);
      return;
    }
    if (!hasTrigger(newTrigger)) {
      onSave(newTrigger, { publish }, () => setDeploying(false));
    } else {
      alert('Action name is already taken');
      setDeploying(false);
    }
  };

  const getCode = () => {
    setDeploying(true);
    getActionCode({
      id: trigger.id,
      name: trigger.name,
      task_name: task.name,
      section: group,
      callback: () => setDeploying(false),
    });
  };

  const handleIndent = () => {
    const currentCode = aceEditor.current ? aceEditor.current.editor.getValue() : actionRef.current;
    const lg = new LinesGetter(currentCode);
    const lines = lg.getLines();
    const indenter = new Indenter(lines);
    const result = indenter.indent(indentSwitch ? '    ' : undefined);
    actionRef.current = result;
    if (aceEditor.current) aceEditor.current.editor.setValue(result, -1);
    setIndentSwitch(!indentSwitch);
  };

  const handleHardIndent = (e) => {
    e.preventDefault();
    const currentCode = aceEditor.current ? aceEditor.current.editor.getValue() : actionRef.current;
    const lg = new LinesGetter(currentCode);
    const lines = lg.getHardLines();
    const indenter = new Indenter(lines);
    const result = indenter.indent(indentSwitch ? '    ' : undefined);
    actionRef.current = result;
    if (aceEditor.current) aceEditor.current.editor.setValue(result, -1);
    setIndentSwitch(!indentSwitch);
  };

  const addLineAtCurrentPosition = (line) => {
    if (aceEditor.current) {
      const editor = aceEditor.current.editor;
      editor.session.insert(editor.getCursorPosition(), line);
    }
  };

  const CortexCompleter = {
    getCompletions: (editor, session, pos, prefix, callback) => {
      callback(null, cortexMacroModCommands);
    },
  };

  const pushBlankEvent = () => setEvents([...events, eventModel({})]);
  const deleteEvent = (id) => setEvents(events.filter((e) => e.id !== id));
  const updateEvent = (event) => {
    const idx = events.findIndex((e) => e.id === event.id);
    const copy = [...events];
    copy[idx] = event;
    setEvents(copy);
  };

  const isBusy = deploying || loading;

  return (
    <Box className={classes.root}>
      {/* Toolbar principal */}
      <Box className={classes.toolbar}>
        <IconButton size="small" onClick={onClose} style={{ color: '#fff', flexShrink: 0 }}>
          <CloseIcon />
        </IconButton>
        <Typography className={classes.toolbarTitle}>{name}</Typography>
        <Typography className={classes.toolbarBreadcrumb}>
          {task.name} &bull; {translateTriggerGroup(group)}
        </Typography>
        <ButtonGroup color="inherit" aria-label="ações do trigger">
          <IconTipButton tip="Save CTRL+S" disabled={isBusy} color="inherit" reference={saveButtonRef} onClick={() => onSaveLocal(false)} style={{ color: '#fff' }}>
            <SaveIcon />
          </IconTipButton>
          <IconTipButton tip="See Kode CTRL+K" disabled={isBusy} color="inherit" reference={kodeButtonRef} onClick={getCode} style={{ color: '#fff' }}>
            <CodeIcon />
          </IconTipButton>
          <IconTipButton tip="Launch CTRL+L" disabled={isBusy} color="inherit" reference={launchButtonRef} onClick={() => onSaveLocal(true)} style={{ color: '#fff' }}>
            <Icon name="rocket" size="small" />
          </IconTipButton>
        </ButtonGroup>
      </Box>

      {/* Toolbar secundária */}
      <Box className={classes.secondaryBar}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <IconTipButton tip="Events CTRL+E" color="inherit" reference={eventsButtonRef} onClick={() => setOpenEvents(true)} style={{ color: '#aaa' }}>
            <EventIcon fontSize="small" />
          </IconTipButton>
          <IconTipButton
            tip="Indent"
            color="inherit"
            onContextMenu={handleHardIndent}
            reference={indentButtonRef}
            onClick={handleIndent}
            onDoubleClick={handleIndent}
            style={{ color: '#aaa' }}
          >
            <FormatAlignRightIcon fontSize="small" />
          </IconTipButton>
          <AddTemplateButton
            getPublicTemplates={getPublicTemplates}
            addLine={addLineAtCurrentPosition}
            successAlert={(msg) => alert(msg, 'success')}
          />
          <ChangeThemeButton context={themeContext} theme={theme} setTheme={updateTheme} />
          <InfoButton
            editorMode={editorMode}
            subject={infoButtonSubject}
            sourcesHook={infoSourcesHook}
            project={project}
            error_alert={(msg) => alert(msg, 'error')}
          />
        </Box>
        <Box>
          <IconButton ref={editButtonRef} size="small" onClick={() => setOpenConfig(true)} style={{ color: '#aaa' }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* AceEditor */}
      <Box className={classes.editorArea}>
        <AceEditor
          ref={aceEditor}
          onLoad={onLoadAce({ editorMode, setInfoButtonSubject, completer: CortexCompleter })}
          mode="javascript"
          theme={theme}
          defaultValue={trigger.action}
          onChange={handleActionChange}
          name={`inline-trigger-editor-${trigger.id}`}
          editorProps={{ $blockScrolling: Infinity }}
          fontSize={20}
          tabSize={2}
          showPrintMargin={false}
          width="100%"
          height="100%"
          commands={[
            { name: 'save',   bindKey: { win: 'Ctrl-S', mac: 'Command-S' }, exec: () => saveButtonRef.current   && saveButtonRef.current.click()   },
            { name: 'launch', bindKey: { win: 'Ctrl-L', mac: 'Command-L' }, exec: () => launchButtonRef.current && launchButtonRef.current.click() },
            { name: 'kode',   bindKey: { win: 'Ctrl-K', mac: 'Command-K' }, exec: () => kodeButtonRef.current   && kodeButtonRef.current.click()   },
            { name: 'events', bindKey: { win: 'Ctrl-E', mac: 'Command-E' }, exec: () => eventsButtonRef.current && eventsButtonRef.current.click() },
            { name: 'props',  bindKey: { win: 'Ctrl-P', mac: 'Command-P' }, exec: () => editButtonRef.current   && editButtonRef.current.click()   },
          ]}
          setOptions={{ enableLiveAutocompletion: true, enableSnippets: true, animatedScroll: true }}
        />
      </Box>

      {/* Drawer de configuração (direita) */}
      <Drawer anchor="right" open={openConfig} onClose={() => setOpenConfig(false)}>
        <DrawerHeader onClose={() => setOpenConfig(false)} />
        <List>
          <ListItem>
            <TextField
              margin="dense"
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
              label="Action name"
              variant="outlined"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Switch checked={blocking} onChange={() => setBlocking(!blocking)} color="primary" />}
              label="Blocking"
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Drawer de events (esquerda) */}
      <Drawer anchor="left" open={openEvents} onClose={() => setOpenEvents(false)}>
        <DrawerHeader onClose={() => setOpenEvents(false)} />
        {events.map((e, k) => (
          <Event event={e} key={k} deleteEvent={deleteEvent} updateEvent={updateEvent} />
        ))}
        <IconButton aria-label="add event" onClick={pushBlankEvent}>
          <Add />
        </IconButton>
      </Drawer>
    </Box>
  );
}

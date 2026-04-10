import React, { useEffect, useMemo, useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import Macro from '../Macro';
import PlainMacro from '../PlainMacro';
import Loader from '../Loader';
import Projects from '../Projects';
import Templates from '../Templates';
import CSKeyGenerator from '../uis/CSKeyGenerator';

const ACTIVITY_KEY = 'cortex-workbench-activity';
const SIDEBAR_KEY = 'cortex-workbench-sidebar-open';
const TAB_KEY = 'cortex-workbench-active-tab';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    minHeight: 'calc(100vh - 64px - 48px)',
    background: 'var(--wb-bg)'
  },
  activityBar: {
    width: 56,
    background: 'var(--wb-panel-1)',
    borderRight: '1px solid var(--wb-border)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 8,
    gap: 4
  },
  activityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    color: 'var(--wb-text-dim)'
  },
  activityButtonActive: {
    color: 'var(--wb-text)',
    background: 'var(--wb-active)'
  },
  sidebar: {
    width: 280,
    background: 'var(--wb-panel-2)',
    borderRight: '1px solid var(--wb-border)',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarClosed: {
    width: 0,
    borderRight: 0,
    overflow: 'hidden'
  },
  sidebarHeader: {
    minHeight: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px 0 14px'
  },
  sidebarTitle: {
    color: 'var(--wb-text)',
    fontSize: 12,
    letterSpacing: '.06em',
    textTransform: 'uppercase'
  },
  sidebarList: {
    overflowY: 'auto',
    paddingTop: 0
  },
  sidebarItemText: {
    '& .MuiTypography-root': {
      color: 'var(--wb-text)',
      fontSize: 13
    }
  },
  editor: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0
  },
  tabs: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    background: 'var(--wb-panel-1)',
    borderBottom: '1px solid var(--wb-border)',
    overflowX: 'auto'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 14px',
    borderRight: '1px solid var(--wb-border)',
    fontSize: 12,
    color: 'var(--wb-text-dim)',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  tabActive: {
    color: 'var(--wb-text)',
    background: 'var(--wb-panel-2)'
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 16,
    color: 'var(--wb-text)'
  },
  emptyBlock: {
    padding: 16,
    color: 'var(--wb-text-dim)',
    fontSize: 13
  }
}));

const resolveActivityByPath = (pathname, fallback = 'projects') => {
  if (pathname.startsWith('/project/')) {
    return 'open';
  }
  if (pathname.startsWith('/libs')) {
    return 'libraries';
  }
  if (pathname.startsWith('/projects')) {
    return 'projects';
  }
  return fallback;
};

const getTabFromPath = (pathname) => {
  if (pathname.startsWith('/project/')) {
    return pathname;
  }
  if (pathname.startsWith('/libs')) {
    return 'libs';
  }
  if (pathname.startsWith('/projects')) {
    return 'projects';
  }
  return 'projects';
};

export default function WorkbenchShell({ context, editorMode }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(() => localStorage.getItem(SIDEBAR_KEY) !== 'false');
  const [activity, setActivity] = useState(() => localStorage.getItem(ACTIVITY_KEY) || 'projects');
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem(TAB_KEY) || 'projects');

  const activityItems = useMemo(() => [
    { id: 'open', label: 'Projeto Aberto', icon: <FolderOpenIcon fontSize="small" />, path: '/projects' },
    { id: 'projects', label: 'Projetos', icon: <ListAltIcon fontSize="small" />, path: '/projects' },
    { id: 'libraries', label: 'Bibliotecas', icon: <LibraryBooksIcon fontSize="small" />, path: '/libs' }
  ], []);

  useEffect(() => {
    const selected = resolveActivityByPath(location.pathname, activity);
    setActivity(selected);
    localStorage.setItem(ACTIVITY_KEY, selected);

    const newTab = getTabFromPath(location.pathname);
    setActiveTab(newTab);
    localStorage.setItem(TAB_KEY, newTab);
  }, [location.pathname]);

  const handleActivityClick = (item) => {
    setActivity(item.id);
    localStorage.setItem(ACTIVITY_KEY, item.id);
    if (!sidebarOpen) {
      setSidebarOpen(true);
      localStorage.setItem(SIDEBAR_KEY, 'true');
    }
    history.push(item.path);
  };

  const toggleSidebar = () => {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    localStorage.setItem(SIDEBAR_KEY, String(next));
  };

  const openProjectFromSidebar = (project) => {
    const projectMacro = project.macro || { protocol: project.protocol || 'NONE' };
    if (projectMacro.protocol === 'CTRL') {
      history.push(`/project/${project.id}`);
      return;
    }
    history.push(`/project/flat/${project.id}`);
  };

  const renderSidebarContent = () => {
    if (activity === 'libraries') {
      return (
        <List className={classes.sidebarList}>
          <ListItem button onClick={() => history.push('/libs')}>
            <ListItemText className={classes.sidebarItemText} primary="Abrir My Libraries" secondary="Gerencie templates compartilhados e privados" />
          </ListItem>
        </List>
      );
    }

    if (activity === 'open') {
      const recent = (context.macros || []).slice(0, 20);
      if (!recent.length) {
        return <Box className={classes.emptyBlock}>Nenhum projeto carregado ainda.</Box>;
      }

      return (
        <List className={classes.sidebarList}>
          {recent.map((project) => (
            <ListItem key={project.id} button onClick={() => openProjectFromSidebar(project)}>
              <ListItemText
                className={classes.sidebarItemText}
                primary={(project.macro && project.macro.name) ? project.macro.name : project.name}
                secondary={project.dev || ''}
              />
            </ListItem>
          ))}
        </List>
      );
    }

    return (
      <List className={classes.sidebarList}>
        <ListItem button onClick={() => history.push('/projects')}>
          <ListItemText className={classes.sidebarItemText} primary="Explorar Projetos" secondary="Busca, criacao e acesso rapido" />
        </ListItem>
      </List>
    );
  };

  const currentTabLabel = () => {
    if (location.pathname.startsWith('/project/flat/')) {
      return 'Editor (Flat)';
    }
    if (location.pathname.startsWith('/project/')) {
      return 'Editor (CTRL)';
    }
    if (location.pathname.startsWith('/libs')) {
      return 'My Libraries';
    }
    return 'My Projects';
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.activityBar}>
        {activityItems.map((item) => (
          <Tooltip title={item.label} key={item.id} placement="right">
            <IconButton
              className={`${classes.activityButton} ${activity === item.id ? classes.activityButtonActive : ''}`}
              onClick={() => handleActivityClick(item)}
              aria-label={item.label}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Box className={`${classes.sidebar} ${!sidebarOpen ? classes.sidebarClosed : ''}`}>
        <Box className={classes.sidebarHeader}>
          <Typography className={classes.sidebarTitle}>{activityItems.find((item) => item.id === activity)?.label || 'Projetos'}</Typography>
          <IconButton size="small" onClick={toggleSidebar} aria-label="toggle sidebar">
            <ChevronLeftIcon style={{ color: 'var(--wb-text-dim)' }} fontSize="small" />
          </IconButton>
        </Box>
        <Divider style={{ background: 'var(--wb-border)' }} />
        {renderSidebarContent()}
      </Box>

      {!sidebarOpen && (
        <IconButton size="small" onClick={toggleSidebar} aria-label="open sidebar" style={{ alignSelf: 'flex-start', margin: 8 }}>
          <ChevronRightIcon style={{ color: 'var(--wb-text-dim)' }} fontSize="small" />
        </IconButton>
      )}

      <Box className={classes.editor}>
        <Box className={classes.tabs}>
          <Box className={`${classes.tab} ${classes.tabActive}`} onClick={() => history.push(location.pathname)}>
            {currentTabLabel()}
          </Box>
        </Box>
        <Box className={classes.content}>
          <Switch>
            <Route path="/project/flat/:id" render={(props) => {
              const project = context.macros.find((m) => String(m.id) === String(props.match.params.id));
              return (
                (project) ? (
                  ((project.macro) && (project.macro.type)) ?
                    <PlainMacro
                      {...props}
                      project={project}
                      saveMacro={context.saveMacro}
                      getBuild={context.getBuild}
                      getTemplateInfo={context.getTemplateInfo}
                      getPublicTemplates={context.getPublicTemplates}
                      editorMode={editorMode}
                      getDoc={context.getDoc}
                      addCollaborator={context.addCollaborator}
                      removeCollaborator={context.removeCollaborator}
                    />
                    :
                    <Loader {...props} getMacro={context.getMacro} />
                ) : ''
              );
            }} />

            <Route path="/project/:id" render={(props) => {
              const project = context.macros.find((m) => String(m.id) === String(props.match.params.id));
              return (
                (project) ? (
                  ((project.macro) && (project.macro.tasks)) ?
                    <Macro
                      {...props}
                      project={project}
                      saveMacro={context.saveMacro}
                      getTask={context.getTask}
                      getTasks={context.getTasks}
                      getBuild={context.getBuild}
                      isUserSuper={context.isUserSuper}
                      getActionCode={context.getActionCode}
                      getTemplateInfo={context.getTemplateInfo}
                      getDoc={context.getDoc}
                      editorMode={editorMode}
                      addCollaborator={context.addCollaborator}
                      removeCollaborator={context.removeCollaborator}
                      getPublicTemplates={context.getPublicTemplates}
                    />
                    :
                    <Loader {...props} getMacro={context.getMacro} />
                ) : ''
              );
            }} />

            <Route exact path="/libs" render={(props) => (
              <Templates
                {...props}
                getTemplates={context.getTemplates}
                saveTemplates={context.saveTemplates}
                component={Templates}
                getTemplateInfo={context.getTemplateInfo}
                getPublicTemplates={context.getPublicTemplates}
                getDoc={context.getDoc}
                editorMode={editorMode}
              />
            )} />

            <Route exact path="/cskey" render={(props) => (
              <CSKeyGenerator
                {...props}
                setToken={context.setToken}
                setUsername={context.setUsername}
                setIsUserSuper={context.setIsUserSuper}
              />
            )} />

            <Route exact path="/projects" render={(props) => (
              <Projects
                {...props}
                addMacro={context.addMacro}
                delMacro={context.delMacro}
                macros={context.macros}
                fetchMacros={context.fetchMacros}
                totalRecords={context.totalRecords}
                pagination={context.pagination}
                isUserSuper={context.isUserSuper}
                setIsUserSuper={context.setIsUserSuper}
                username={context.username}
              />
            )} />

            <Redirect to="/projects" />
          </Switch>
        </Box>
      </Box>
    </Box>
  );
}
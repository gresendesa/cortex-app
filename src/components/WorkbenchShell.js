import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Tooltip, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Macro from '../Macro';
import PlainMacro from '../PlainMacro';
import Loader from '../Loader';
import Projects from '../Projects';
import Templates from '../Templates';
import CSKeyGenerator from '../uis/CSKeyGenerator';
import DeleteButton from '../uis/DeleteButton';

const ACTIVITY_KEY = 'cortex-workbench-activity';
const SIDEBAR_KEY = 'cortex-workbench-sidebar-open';

function ProjectsSidebarView({ macros, fetchMacros, pagination, delMacro, username, isUserSuper, onOpenProject }) {
  const [searchString, setSearchString] = useState('');
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [infoDialog, setInfoDialog] = useState({ open: false, project: null });
  const scrollRef = useRef(null);
  const loadingRef = useRef(false);

  const startLoading = () => { loadingRef.current = true; setLoadingProjects(true); };
  const stopLoading = () => { loadingRef.current = false; setLoadingProjects(false); };

  const handleInfoOpen = (e, project) => {
    e.stopPropagation();
    setInfoDialog({ open: true, project });
  };

  const handleInfoClose = () => {
    setInfoDialog({ open: false, project: null });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      startLoading();
      fetchMacros({
        page: 1,
        pageSize: (pagination && pagination.page_size) ? pagination.page_size : 20,
        q: searchString,
        append: false,
        success: stopLoading,
        error: stopLoading
      });
    }, 300);
    return () => clearTimeout(handler);
  }, [searchString]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (loadingRef.current || !pagination || !pagination.has_next) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        startLoading();
        fetchMacros({
          page: pagination.next_page,
          pageSize: pagination.page_size,
          q: pagination.q !== undefined ? pagination.q : searchString,
          append: true,
          success: stopLoading,
          error: stopLoading
        });
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [pagination, fetchMacros, searchString]);

  const handleDelete = (id) => {
    delMacro({ id });
  };

  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Box style={{ padding: '6px 8px', flexShrink: 0 }}>
          <InputBase
            fullWidth
            placeholder="Buscar projetos…"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            startAdornment={<SearchIcon style={{ color: 'var(--wb-text-dim)', marginRight: 4, fontSize: 18 }} />}
            inputProps={{ 'aria-label': 'buscar projetos' }}
            style={{
              color: 'var(--wb-text)',
              fontSize: 13,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 4,
              padding: '2px 8px',
              width: '100%'
            }}
          />
        </Box>
        <Divider style={{ background: 'var(--wb-border)', flexShrink: 0 }} />
        <Box ref={scrollRef} style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          <List dense disablePadding>
            {macros.length === 0 && !loadingProjects && (
              <ListItem>
                <ListItemText
                  primary="Nenhum projeto encontrado."
                  primaryTypographyProps={{ style: { color: 'var(--wb-text-dim)', fontSize: 12 } }}
                />
              </ListItem>
            )}
            {macros.map((project) => {
              const name = (project.macro && project.macro.name) ? project.macro.name : (project.name || `Projeto ${project.id}`);
              const dev = project.dev || '';
              const canDelete = isUserSuper || dev === username;
              const showActions = hoveredProjectId === project.id;
              return (
                <ListItem
                  key={project.id}
                  button
                  onClick={() => onOpenProject(project)}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  style={{ paddingRight: 44 }}
                >
                  <ListItemText
                    primary={name}
                    secondary={dev || undefined}
                    primaryTypographyProps={{ style: { color: 'var(--wb-text)', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }}
                    secondaryTypographyProps={{ style: { color: 'var(--wb-text-dim)', fontSize: 11 } }}
                  />
                  {showActions && (
                    <ListItemSecondaryAction
                      onMouseEnter={() => setHoveredProjectId(project.id)}
                      onMouseLeave={() => setHoveredProjectId(null)}
                    >
                      <Tooltip title="Informações do projeto" placement="left">
                        <IconButton
                          edge="end"
                          aria-label="informações"
                          onClick={(e) => handleInfoOpen(e, project)}
                          style={{ marginRight: 4 }}
                        >
                          <InfoOutlinedIcon style={{ color: 'var(--wb-text-dim)', fontSize: 20 }} />
                        </IconButton>
                      </Tooltip>
                      {canDelete ? (
                        <DeleteButton
                          type="trigger"
                          callback={() => handleDelete(project.id)}
                        />
                      ) : (
                        <Tooltip title="Sem permissão para apagar" placement="left">
                          <span>
                            <IconButton edge="end" aria-label="sem permissão" disabled>
                              <DeleteOutlineIcon style={{ opacity: 0.3 }} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              );
            })}
            {loadingProjects && (
              <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={18} style={{ color: 'var(--wb-text-dim)' }} />
              </ListItem>
            )}
          </List>
        </Box>
      </Box>

      <Dialog open={infoDialog.open} onClose={handleInfoClose} maxWidth="sm" fullWidth>
        <DialogTitle>Informações do Projeto</DialogTitle>
        <DialogContent dividers>
          {infoDialog.project && (
            <Box>
              <Typography variant="body2" style={{ marginBottom: 12, fontWeight: 600 }}>
                {(infoDialog.project.macro && infoDialog.project.macro.name) ? infoDialog.project.macro.name : (infoDialog.project.name || `Projeto ${infoDialog.project.id}`)}
              </Typography>
              <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginBottom: 16 }}>
                Desenvolvedor: {infoDialog.project.dev || 'N/A'}
              </Typography>
              <Divider style={{ marginBottom: 12 }} />
              <Typography variant="body2" style={{ fontWeight: 600, marginBottom: 6 }}>
                Descrição
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-wrap', marginBottom: 16 }}>
                {(infoDialog.project.macro && infoDialog.project.macro.description) || 'Sem descrição.'}
              </Typography>
              <Divider style={{ marginBottom: 12 }} />
              <Typography variant="caption" color="textSecondary" style={{ display: 'block' }}>
                Criado em: {infoDialog.project.created ? new Date(infoDialog.project.created).toLocaleString('pt-BR') : 'N/A'}
              </Typography>
              <Typography variant="caption" color="textSecondary" style={{ display: 'block' }}>
                Última modificação: {infoDialog.project.last_modified ? new Date(infoDialog.project.last_modified).toLocaleString('pt-BR') : 'N/A'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    overflow: 'hidden',
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
    flexDirection: 'column',
    overflow: 'hidden'
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
    minWidth: 0,
    overflow: 'hidden'
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
    gap: 6,
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
  tabLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 180
  },
  tabClose: {
    color: 'var(--wb-text-dim)',
    padding: 2
  },
  content: {
    flex: 1,
    overflow: 'auto',
    minHeight: 0,
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
  const [closeDialog, setCloseDialog] = useState({ open: false, tab: null });
  const sidebarStateBeforeFlat = useRef(null);

  const activityItems = useMemo(() => [
    { id: 'open', label: 'Projeto Aberto', icon: <FolderOpenIcon fontSize="small" />, path: '/projects' },
    { id: 'projects', label: 'Projetos', icon: <ListAltIcon fontSize="small" />, path: '/projects' },
    { id: 'libraries', label: 'Bibliotecas', icon: <LibraryBooksIcon fontSize="small" />, path: '/libs' }
  ], []);

  useEffect(() => {
    const isFlat = location.pathname.startsWith('/project/flat/');
    
    if (isFlat) {
      if (sidebarStateBeforeFlat.current === null) {
        sidebarStateBeforeFlat.current = sidebarOpen;
      }
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    } else {
      if (sidebarStateBeforeFlat.current !== null) {
        setSidebarOpen(sidebarStateBeforeFlat.current);
        sidebarStateBeforeFlat.current = null;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const selected = resolveActivityByPath(location.pathname, activity);
    setActivity(selected);
    localStorage.setItem(ACTIVITY_KEY, selected);

    if (context.ensureWorkbenchTab) {
      context.ensureWorkbenchTab(location.pathname);
    }
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
      <ProjectsSidebarView
        macros={context.macros || []}
        fetchMacros={context.fetchMacros}
        pagination={context.pagination}
        delMacro={context.delMacro}
        username={context.username}
        isUserSuper={context.isUserSuper}
        onOpenProject={openProjectFromSidebar}
      />
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

  const onTabClick = (tab) => {
    if (context.focusWorkbenchTab) {
      context.focusWorkbenchTab(tab.key);
    }
    history.push(tab.path);
  };

  const onTabClose = (e, tab) => {
    e.stopPropagation();

    if (tab.isDirty) {
      setCloseDialog({ open: true, tab });
      return;
    }

    if (context.closeWorkbenchTab) {
      context.closeWorkbenchTab({
        tabKey: tab.key,
        currentPath: location.pathname,
        onNavigate: (nextPath) => {
          if (nextPath && nextPath !== location.pathname) {
            history.push(nextPath);
          }
        }
      });
    }
  };

  const closeTabWithoutSave = (tab) => {
    if (!tab || !context.closeWorkbenchTab) {
      return;
    }
    context.setWorkbenchTabDirty(tab.key, false);
    context.closeWorkbenchTab({
      tabKey: tab.key,
      currentPath: location.pathname,
      onNavigate: (nextPath) => {
        if (nextPath && nextPath !== location.pathname) {
          history.push(nextPath);
        }
      }
    });
  };

  const onCloseDirtyDialog = () => {
    setCloseDialog({ open: false, tab: null });
  };

  const onDirtySaveAndClose = async () => {
    const tab = closeDialog.tab;
    if (!tab) {
      onCloseDirtyDialog();
      return;
    }

    const ok = context.invokeWorkbenchTabSave ? await context.invokeWorkbenchTabSave(tab.key) : false;
    if (ok) {
      closeTabWithoutSave(tab);
    }
    onCloseDirtyDialog();
  };

  const onDirtyDiscardAndClose = () => {
    closeTabWithoutSave(closeDialog.tab);
    onCloseDirtyDialog();
  };

  const tabs = (context.workbenchTabs && context.workbenchTabs.length > 0)
    ? context.workbenchTabs
    : [{ key: getTabFromPath(location.pathname), path: location.pathname, label: currentTabLabel(), closable: false }];

  const isFlat = location.pathname.startsWith('/project/flat/');

  return (
    <Box className={classes.root}>
      <Box className={classes.activityBar}>
        {activityItems.map((item) => {
          const isDisabled = item.id === 'open' && isFlat;
          const tooltipTitle = isDisabled ? 'Não disponível em projetos flat' : item.label;
          return (
            <Tooltip title={tooltipTitle} key={item.id} placement="right">
              <span>
                <IconButton
                  className={`${classes.activityButton} ${activity === item.id ? classes.activityButtonActive : ''}`}
                  onClick={() => !isDisabled && handleActivityClick(item)}
                  aria-label={item.label}
                  disabled={isDisabled}
                  style={isDisabled ? { opacity: 0.3, cursor: 'not-allowed' } : undefined}
                >
                  {item.icon}
                </IconButton>
              </span>
            </Tooltip>
          );
        })}
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
          {tabs.map((tab) => {
            const isActive = (context.activeWorkbenchTabKey && context.activeWorkbenchTabKey === tab.key) || tab.path === location.pathname;
            return (
              <Box key={tab.key} className={`${classes.tab} ${isActive ? classes.tabActive : ''}`} onClick={() => onTabClick(tab)}>
                <span className={classes.tabLabel}>{tab.isDirty ? `* ${tab.label || currentTabLabel()}` : (tab.label || currentTabLabel())}</span>
                {tab.closable && (
                  <IconButton size="small" className={classes.tabClose} onClick={(e) => onTabClose(e, tab)} aria-label="close tab">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            );
          })}
        </Box>
        <Box className={classes.content} style={location.pathname.startsWith('/project/flat/') ? { padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' } : undefined}>
          <Switch>
            <Route path="/project/flat/:id" render={(props) => {
              const project = context.macros.find((m) => String(m.id) === String(props.match.params.id));
              return (
                (project) ? (
                  ((project.macro) && (project.macro.type)) ?
                    <PlainMacro
                      key={`flat-${project.id}`}
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
                      tabKey={location.pathname}
                      setTabDirty={context.setWorkbenchTabDirty}
                      registerTabSaveHandler={context.registerWorkbenchTabSaveHandler}
                      unregisterTabSaveHandler={context.unregisterWorkbenchTabSaveHandler}
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
                      key={`ctrl-${project.id}`}
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
                      tabKey={location.pathname}
                      setTabDirty={context.setWorkbenchTabDirty}
                      registerTabSaveHandler={context.registerWorkbenchTabSaveHandler}
                      unregisterTabSaveHandler={context.unregisterWorkbenchTabSaveHandler}
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

      <Dialog open={closeDialog.open} onClose={onCloseDirtyDialog}>
        <DialogTitle>Fechar Aba com Alteracoes?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Esta aba possui alteracoes nao salvas. Deseja salvar antes de fechar?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDirtyDialog} color="default">Cancelar</Button>
          <Button onClick={onDirtyDiscardAndClose} color="secondary">Nao salvar</Button>
          <Button onClick={onDirtySaveAndClose} color="primary" variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
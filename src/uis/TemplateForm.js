import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SaveIcon from '@material-ui/icons/Save';
import { Icon } from 'semantic-ui-react';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import translateTriggerGroup from './utils';
import { triggerModel } from '../mock/models'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Add from '@material-ui/icons/Add';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';

import Event from './Event';
import DrawerHeader from './DrawerHeader';

import { eventModel } from '../mock/models';

import Indenter from '../Indenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import { cortexMacroModCommands } from '../data/CortexMacroModCommands';

export default function TemplateForm() {
  

  const [action, setAction] = useState('');
  const [indentSwitch, setIndentSwitch] = useState(false);

  const handleActionChange = (newValue) =>  {
    setAction(newValue);
  }

  const handleIndent = (e) => {
    const lines = action.split('\n');
    const indenter = new Indenter(lines);
    var result = null;
    if(indentSwitch){
      result = indenter.indent('    ');
    } else {
      result = indenter.indent();
    }
    setAction(result);
    setIndentSwitch(!indentSwitch);
  }

  /*const dataa = https://beta.mkb.gorlem.ml/api/docs/

  const arr = dataa.map(i => {
    if(i.type=='Variable'){
      return ({
        value: i.extendedName,
        score: 1,
        meta: i.description !== null ? i.description : ''
      })
    } else
    if(i.type=='Action'){
      return ({
        value: `${i.extendedName};`,
        score: 1,
        meta: i.description !== null ? i.description : ''
      })
    }
    return false;
  });

*/

  var CortexCompleter ={
      getCompletions: function(editor, session, pos, prefix, callback) {
          var completions = cortexMacroModCommands;
          callback(null, completions);
      }
  }

  //<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
  return (
    <div>

      <IconButton edge="start" color="inherit" onClick={handleIndent} onDoubleClick={handleIndent} aria-label="close">
        <FormatAlignRightIcon />
      </IconButton>

      <AceEditor 
        mode="javascript"
        theme="monokai"
        value={action}
        onChange={handleActionChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={20}
        tabSize={2}
        width="100%"
        setOptions={{
          enableBasicAutocompletion: [CortexCompleter],
          enableLiveAutocompletion: true,
          enableSnippets: true,
          animatedScroll: true
        }}
      />

    </div>
  );
}

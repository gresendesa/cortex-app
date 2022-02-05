import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default function IconTipButton({ children, tip, disabled=false, reference, color="inherit" , edge="end", onClick, onContextMenu }) {
  return (
    <Tooltip title={tip} aria-label="button">
      <IconButton edge="end" disabled={disabled} color={color} ref={reference} onClick={onClick} onContextMenu={onContextMenu} aria-label="">
        { children }
      </IconButton>
    </Tooltip>
  )
}
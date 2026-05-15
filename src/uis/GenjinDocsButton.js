import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import IconTipButton from './IconTipButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function GenjinDocsButton() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (open && content === null) {
      fetch('/genjin-language.md')
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch(() => setContent('Erro ao carregar documentação.'));
    }
  }, [open, content]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconTipButton tip="Genjin Docs" onClick={handleOpen}>
        <MenuBookIcon />
      </IconTipButton>

      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="genjin-docs-title"
      >
        <DialogTitle id="genjin-docs-title" onClose={handleClose}>
          <Typography variant="h6">Genjin — Documentação da Linguagem</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {content === null ? (
            <Typography variant="body2">Carregando...</Typography>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

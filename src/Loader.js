import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function SimpleBackdrop() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  );
}

class Loader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { notFound: false };
	}

	UNSAFE_componentWillMount() {
		const success = res => {}
		const error = err => {
			this.setState({ notFound: true });
		}
		const id = this.props.match.params.id
		this.props.getMacro({ id, success, error })
	}

	render(){
		if (this.state.notFound) {
			return (
				<Fragment>
					<Typography variant="h6" style={{ marginTop: '2rem', textAlign: 'center', color: '#888' }}>
						Projeto não encontrado.
					</Typography>
				</Fragment>
			);
		}
		return (
			<Fragment>
				<SimpleBackdrop />
			</Fragment>
		)
	}

}

export default Loader;


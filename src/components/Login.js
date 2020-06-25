import React, { useState, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import logo from '../images/logo512.png';

import Server from '../server';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(2),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn({ setToken, setUsername }) {
	const classes = useStyles();

	const [uname, setUname] = useState('');
	const [passw, setPassw] = useState('');
	const [processing, setProcessing] = useState(false);
	const [showMessage, setShowMessage] = useState(false);

	const onSubmit = (e) => {
		let server = new Server({});
		setProcessing(true);
		const success = (response) => {
			setToken(response.token);
			setUsername(response.username);
			setProcessing(false);
		}
		const error = (response) => {
			console.log("fey", response);
			setProcessing(false);
			setShowMessage(true);
		}
		server.auth({ username:uname, password:passw, success, error });
		setPassw('');
	}

	return (
		<Fragment>
			{processing && <LinearProgress color="secondary" />}
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar} src={logo} />
					
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="CloudScript username"
							name="email"
							autoComplete="email"
							value={uname}
							onChange={(e) => {setUname(e.target.value)}}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={passw}
							onChange={(e) => {setPassw(e.target.value)}}
							autoComplete="current-password"
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={onSubmit}
							disabled={processing}
						>
							Access my projects
						</Button>
						<Grid container
						direction="column"
						justify="center"
						alignItems="center">
							<Grid item>
								<Link href="https://cloudscript.bezouro.com.br/login" variant="body2">
									{"Don't have an account? Sign Up on CloudScript"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Snackbar open={showMessage} autoHideDuration={2000} onClose={() => {setShowMessage(false)}} >
					<MuiAlert elevation={6} variant="filled" severity="error">
						Access not available
					</MuiAlert>
				</Snackbar>
			</Container>
		</Fragment>
	);
}

import React, { useState } from 'react';
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

import Server from '../server';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn({ setToken }) {
	const classes = useStyles();

	const [username, setUsername] = useState('');
	const [passw, setPassw] = useState('');

	const onSubmit = (e) => {
		console.log(username, passw);
		let server = new Server({});
		const success = (response) => {
			setToken(response.token);
		}
		const error = (response) => {
			console.log("fey", response);
		}
		server.auth({ username, password:passw, success, error });
		setPassw('');
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Log in on Cortex
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
						value={username}
						onChange={(e) => {setUsername(e.target.value)}}
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
		</Container>
	);
}

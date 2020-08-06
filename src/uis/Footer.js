import React from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

export default function Footer({ version }) {

	return(
		<Grid container
				  direction="column"
					justify="center"
					alignItems="center">
			<Grid item>

				<Box mt={5}>
					<Typography variant="body2" color="textSecondary" align="center">
						{'Federal • '}
						<Link color="inherit" href="https://webmacrosoft.herokuapp.com/">
							Macrosoft
						</Link>{' '}
						{' ®'}
						{' '}
						{new Date().getFullYear()}
						{''}
					</Typography>
				</Box>

			</Grid>
			<Grid item>

				<Box mt={1} mb={8}>
						
					<Typography variant="caption" color="textSecondary" align="center">

						{'Supported by '}
						<Link color="inherit" href="https://cloudscript.bezouro.com.br/">
							CloudScript
						</Link>{' '}
						{'technology • Bezouro'}
					</Typography>
				</Box>

			</Grid>
		</Grid>
	)

}	
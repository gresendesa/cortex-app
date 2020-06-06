import React from 'react';
import { Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TriggersSection from './TriggersSection'

export default function TaskPanel({ task }) {

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header">
				<Typography >
				<strong>{ task.name }</strong>
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
			
				<TriggersSection opening={task.triggers.opening} main={task.triggers.main} ending={task.triggers.ending} />

			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

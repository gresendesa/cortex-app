import React, { useState, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import TaskPanel from './TaskPanel';
import uuid from 'uuid';

export default function TasksSection({ project, tasks, disabledTasks, hasDependencies, hookTask, editorMode }) {

	return (

		<Box>
		{
			tasks.length > 0 ?
			tasks.map((task, indice) => {
				return (
					<TaskPanel project={project} disabledTasks={disabledTasks} indice={indice} task={task} key={task.id} hookTask={hookTask} editorMode={editorMode} />
				)
			})
			:
			(!hasDependencies ? <Alert severity="info">
				<AlertTitle>No tasks yet</AlertTitle>
				Use the <strong> button above!</strong>
			</Alert>:'')
		}
		</Box>
	);
}

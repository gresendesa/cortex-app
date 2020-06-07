import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TaskPanel from './TaskPanel';
import uuid from 'uuid';

export default function TasksSection({ tasks, deleteTask }) {

	return (

		<Box>
		{
			tasks.map((task) => {
				return ( <TaskPanel task={task} key={task.id} deleteTask={deleteTask} />)
			})
		}
		</Box>
	);
}

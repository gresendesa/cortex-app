import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TaskPanel from './TaskPanel';
import uuid from 'uuid';

export default function TasksSection({ tasks }) {

	const [tasksList, setTasks] = useState(tasks);

	return (

		<Box>
		{
			tasks.map((task, key) => {
				return ( <TaskPanel task={task} key={key} />)
			})
		}
		</Box>
	);
}

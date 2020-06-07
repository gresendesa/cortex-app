import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TaskPanel from './TaskPanel';
import uuid from 'uuid';

export default function TasksSection({ tasks, hookTask }) {

	return (

		<Box>
		{
			tasks.map((task) => {
				return (
					<Box>
						<TaskPanel task={task} key={task.id} hookTask={hookTask} />
					</Box>
				)
			})
		}
		</Box>
	);
}

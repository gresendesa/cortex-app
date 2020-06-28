import React, { Fragment } from 'react';
import TemplateSection from './uis/TemplateSection';
import { alltemplates } from './data/templates';

class Projects extends React.Component {

	state = {
		namespaces: alltemplates,
	}

	render(){

		return (
				
			<TemplateSection namespaces={this.state.namespaces} />

		);

	}

}

export default Projects;


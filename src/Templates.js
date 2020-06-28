import React, { Fragment } from 'react';
import TemplateSection from './uis/TemplateSection';
import { alltemplates } from './mock/templates';

class Templates extends React.Component {

	state = {
		namespaces: alltemplates,
	}

	setNamespaces = (namespaces) => {
		this.setState({ namespaces });
	}

	render(){

		return (
				
			<TemplateSection namespaces={this.state.namespaces} setNamespaces={this.setNamespaces} />

		)

	}

}

export default Templates;


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

	deleteNamespace = (namespace) => {
		const copyNamespaces = Object.assign([],this.state.namespaces);
		const filtered = copyNamespaces.filter(n => {
			return n.id !== namespace.id;
		})
		this.setNamespaces(filtered);
	}

	templatesHook = () => {
		return {
			setNamespaces: this.setNamespaces,
			deleteNamespace: this.deleteNamespace,
		}
	}

	render(){

		return (
			<TemplateSection namespaces={this.state.namespaces} templatesHook={this.templatesHook} />
		)

	}

}

export default Templates;


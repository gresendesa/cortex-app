import React, { Fragment } from 'react';
import TemplateSection from './uis/TemplateSection';
import { alltemplates } from './mock/templates';

class Templates extends React.Component {

	state = {
		namespaces: [],
	}

	setNamespaces = (namespaces, save=false, callback=()=>{}) => {
		this.setState({ namespaces }, () => {
			if (save) {
				const success = (response) => {
					callback(true, response);
				}
				const error = (response) => {
					callback(false, response);
					alert(response);
				}
				this.props.saveTemplates({ templates: namespaces, success, error })
			}
		});
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

	componentWillMount(){
		const success = (response) => {
			this.setState({'namespaces': response.templates});
		}
		const error = (response) => {
			alert(response);
		}
		this.props.getTemplates({ success, error })
	}

	render(){

		return (
			<TemplateSection namespaces={this.state.namespaces} templatesHook={this.templatesHook} />
		)

	}

}

export default Templates;


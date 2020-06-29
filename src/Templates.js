import React, { Fragment } from 'react';
import TemplateSection from './uis/TemplateSection';
import { alltemplates } from './mock/templates';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

class Templates extends React.Component {

	state = {
		namespaces: [],
		alert: {},
	}

	setNamespaces = (namespaces, save=false, callback=()=>{}) => {
		this.setState({ namespaces }, () => {
			if (save) {
				const success = (response) => {
					callback(true, response);
				}
				const error = (response) => {
					callback(false, response);
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
			this.setState({'alert':{message:response, severity:'error', popUp:true}});
		}
		this.props.getTemplates({ success, error })
	}

	render(){

		return (
			<Fragment>
				<TemplateSection namespaces={this.state.namespaces} templatesHook={this.templatesHook} />
				<Snackbar open={this.state.alert.popUp} autoHideDuration={4000} onClose={() => this.setState({alert: {...this.state.alert, popUp: false}})} >
					<MuiAlert elevation={6} variant="filled" severity={this.state.alert.severity}>
						{this.state.alert.message}
					</MuiAlert>
				</Snackbar>
			</Fragment>
		)

	}

}

export default Templates;


/**
  * <ReactFormBuilder />
*/

import React from 'react';
import { IntlProvider } from 'react-intl';
import FormGenerator from './form';
import AppLocale from './language-provider';
import Preview from './preview';
import Registry from './stores/registry';
import store from './stores/store';
import DndProvider from './use-dnd-provider-element';

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };
    this.editModeOn = this.editModeOn.bind(this);
  }

  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  render() {
    const toolbarProps = {
      showDescription: this.props.show_description,
    };

    const language = this.props.locale ? this.props.locale : 'pt';
    const currentAppLocale = AppLocale[language];
    if (this.props.toolbarItems) { toolbarProps.items = this.props.toolbarItems; }
    return (
      <DndProvider>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <div>
            {/* <DialogDemo toolbarProps={toolbarProps} customToolbarItems={this.props.customToolbarItems} /> */}

            <div
              className="react-form-builder clearfix"
            >

              <Preview
                files={this.props.files}
                manualEditModeOff={this.manualEditModeOff.bind(this)}
                showCorrectColumn={this.props.showCorrectColumn}
                parent={this}
                data={this.props.data}
                url={this.props.url}
                saveUrl={this.props.saveUrl}
                onLoad={this.props.onLoad}
                onPost={this.props.onPost}
                editModeOn={this.editModeOn}
                editMode={this.state.editMode}
                variables={this.props.variables}
                registry={Registry}
                editElement={this.state.editElement}
                renderEditForm={this.props.renderEditForm}
                saveAlways={this.props.saveAlways}
                toolbarProps={toolbarProps}
                customToolbarItems={this.props.customToolbarItems}
              />

            </div>
          </div>
        </IntlProvider>
      </DndProvider>
    );
  }
}

function ReactFormGenerator(props) {
  const language = props.locale ? props.locale : 'pt';
  const currentAppLocale = AppLocale[language];
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <FormGenerator {...props} />
    </IntlProvider>
  );
}

const FormBuilders = {};
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;
FormBuilders.Registry = Registry;

export default FormBuilders;

export {
  ReactFormBuilder, ReactFormGenerator, store as ElementStore, Registry,
};

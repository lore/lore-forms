import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import SchemaForm from '../../lore-react-forms-material-ui/forms/SchemaForm';
import _result from '../../lore-react-forms-material-ui/_result';
import Dialog from '../../../src/decorators/Dialog';

export default Dialog()(createReactClass({
  displayName: 'SchemaTemplate',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    request: PropTypes.object,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    formMap: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    const { model } = this.props;

    return {
      data: model ? model.data : {}
    }
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return _result(config.props, this.props);
  },

  onSubmit: function() {
    const {
      onSubmit
    } = this.getTemplateProps();

    onSubmit(this.state.data);
    this.props.onSubmit(this.state.data);
  },

  onChange: function(name, value) {
    const data = _.merge({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  render: function() {
    const {
      schema,
      formMap,
      fieldMap,
      actionMap,
      config,
      onCancel
    } = this.props;

    const {
      data
    } = this.state;

    const callbacks = {
      onSubmit: this.onSubmit,
      onResetForm: this.onResetForm,
      onCancel: onCancel
    };

    return (
      <SchemaForm
        data={data}
        // validators={validators}
        onChange={this.onChange}
        callbacks={callbacks}
        schema={schema}
        formMap={formMap}
        fieldMap={fieldMap}
        actionMap={actionMap}
        config={config}
      />
    );
  }

}));

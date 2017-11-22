import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import SchemaForm from '../forms/SchemaForm';
import _result from '../_result';

export default createReactClass({
  displayName: 'OverlayTemplate',

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
      key: 0,
      data: model ? model.data : {}
    }
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return _result(config.props, this.props);
  },

  onResetForm: function() {
    const { key } = this.state;
    const initialData = this.getInitialState().data;

    this.setState({
      key: key + 1,
      data: initialData
    });
  },

  onSubmit: function() {
    const {
      onSubmit
    } = this.getTemplateProps();

    onSubmit(this.state.data);
    this.onResetForm();
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
      config
    } = this.props;

    const {
      key,
      data
    } = this.state;

    const callbacks = {
      onSubmit: this.onSubmit,
      onResetForm: this.onResetForm
    };

    return (
      <SchemaForm
        key={key}
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

});

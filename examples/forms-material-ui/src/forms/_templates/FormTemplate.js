import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';

export default createReactClass({
  displayName: 'FormTemplate',

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
    return {
      key: 0,
      data: this.props.data || {
        userId: null,
        text: ''
      }
    }
  },

  getTemplateProps: function() {
    const {
      config
    } = this.props;

    return config.template.props(this.props);
  },

  onSubmit: function() {
    const {
      key,
      data
    } = this.state;

    const {
      onSubmit
    } = this.getTemplateProps();

    onSubmit(data);

    const initialData = this.getInitialState().data;

    this.setState({
      key: key + 1,
      data: initialData
    });
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
      onSubmit: this.onSubmit
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

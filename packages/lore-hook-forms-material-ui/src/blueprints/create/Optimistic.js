import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';

export default createReactClass({
  displayName: 'Create.Optimistic',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    modelName: PropTypes.string.isRequired
  },

  getInitialState: function() {
    const { data } = this.props;

    return {
      key: 0,
      data: data || {}
    };
  },

  onSubmit: function(data) {
    const { modelName } = this.props;

    lore.actions[modelName].create(data);

    this.setState({
      key: this.state.key + 1,
      data: this.getInitialState().data
    });
  },

  onChange: function(name, value) {
    const nextData = _.merge({}, this.state.data);
    nextData[name] = value;
    this.setState({
      data: nextData
    });
  },

  getValidators: function(data) {
    const { validators } = this.props;
    return _result(validators || {}, data);
  },

  render: function() {
    const {
      schema,
      fieldMap,
      actionMap,
      config
    } = this.props;
    const { key, data } = this.state;
    const validators = this.getValidators(data);

    return (
      <SchemaForm
        key={key}
        data={data}
        validators={validators}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        callbacks={{
          onSubmit: this.onSubmit,
          onCancel: this.props.onCancel
        }}
        schema={schema}
        fieldMap={fieldMap}
        actionMap={actionMap}
        config={_.merge({
          fields: {},
          actions: []
        }, config)}
      />
    );
  }

});

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';
import { CardTitle } from 'material-ui';

export default createReactClass({
  displayName: 'Optimistic',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired
  },

  getInitialState: function() {
    const { data } = this.props;

    return {
      key: 0,
      data: data || {}
    };
  },

  request: function(data) {
    const { modelName } = this.props;
    const { request } = this.props;
    return request ? request(data) : lore.actions[modelName].create(data).payload;
  },

  onSubmit: function() {
    const { data } = this.state;
    this.request(data);
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
    const { modelName } = this.props;
    const {
      title = `Create ${_.capitalize(modelName)}`,
      description = '',
      schema,
      fieldMap,
      actionMap,
      fields,
      actions
    } = this.props;

    const {
      key,
      data
    } = this.state;

    const validators = this.getValidators(data);

    return (
      <div>
        <CardTitle
          title={title}
          subtitle={description}
        />
        <SchemaForm
          key={key}
          data={data}
          validators={validators}
          onChange={this.onChange}
          callbacks={{
            onSubmit: this.onSubmit
          }}
          schema={schema}
          fieldMap={fieldMap}
          actionMap={actionMap}
          fields={fields || []}
          actions={actions || []}
        />
      </div>
    );
  }

});

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';

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
    fields: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired
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
    const { onSubmit } = this.props;
    onSubmit ? onSubmit(data) : lore.actions[modelName].create(data);
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
        <div className="modal-header">
          {title ? (
            <h4 className="modal-title">
              {title}
            </h4>
          ) : null}
          {description ? (
            <p className="help-block">
              {description}
            </p>
          ) : null}
        </div>
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
          fields={fields || {}}
          actions={actions || []}
        />
      </div>
    );
  }

});

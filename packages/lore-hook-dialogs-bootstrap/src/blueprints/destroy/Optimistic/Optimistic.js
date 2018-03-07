import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';

export default createReactClass({
  displayName: 'Optimistic',

  propTypes: {
    model: PropTypes.object.isRequired,
    data: PropTypes.object,
    validators: PropTypes.object,
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
    const { model } = this.props;

    return {
      data: _.merge({}, model.data)
    };
  },

  onSubmit: function(data) {
    const { modelName } = this.props;
    const { model } = this.props;
    lore.actions[modelName].destroy(model);
    this.onCancel();
  },

  onCancel: function(data) {
    this.props.onCancel(data);
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
      title = `Delete ${_.capitalize(modelName)}`,
      description = '',
      schema,
      fieldMap,
      actionMap,
      fields,
      actions
    } = this.props;
    const { data } = this.state;
    const validators = this.getValidators(data);

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.onCancel}>
              <span>&times;</span>
            </button>
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
            data={data}
            validators={validators}
            onChange={this.onChange}
            callbacks={{
              onSubmit: this.onSubmit,
              onCancel: this.onCancel
            }}
            schema={schema}
            fieldMap={fieldMap}
            actionMap={actionMap}
            fields={fields || {}}
            actions={actions || []}
          />
        </div>
      </div>
    );
  }

});
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from 'lore-utils';
import { SchemaForm } from 'lore-react-forms';
import { RequestError } from 'lore-react-forms-bootstrap';

export default createReactClass({
  displayName: 'Step',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    request: PropTypes.object,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired
  },

  getInitialState: function() {
    const { data } = this.props;

    return {
      data: _.merge({}, data)
    };
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
      title = `Update ${_.capitalize(modelName)}`,
      description = '',
      schema,
      fieldMap,
      actionMap,
      fields,
      actions,
      callbacks,
      hasError,
      request,
      steps,
      activeStep
    } = this.props;
    const { data } = this.state;
    const validators = this.getValidators(data);

    return (
      <div>
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
        {hasError ? (
          <RequestError request={request}>
            {(request) => {
              return request.error;
            }}
          </RequestError>
        ) : null}
        {steps ? (
          <div className="modal-body">
            <div className="btn-group btn-group-justified">
              {steps.map((step, index) => {
                return (
                  <div
                    key={step}
                    className={`btn ${index <= activeStep ? 'btn-primary' : 'btn-default'}`}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <SchemaForm
          data={data}
          validators={validators}
          onChange={this.onChange}
          callbacks={callbacks}
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

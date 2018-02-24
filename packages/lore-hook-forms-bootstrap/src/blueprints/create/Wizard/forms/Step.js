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
    const {
      schema,
      fieldMap,
      actionMap,
      config,
      modelName,
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
        <div style={{ padding: '20px', fontSize: '20px', fontWeight: '500' }}>
          {`Create ${_.capitalize(modelName)}`}
        </div>
        {hasError ? (
          <div style={{ padding: '0px 20px' }}>
            <RequestError request={request}>
              {(request) => {
                return request.error;
              }}
            </RequestError>
          </div>
        ) : null}
        {steps ? (
          <div style={{ padding: '0px 20px' }}>
            <div className="btn-group btn-group-justified">
              {steps.map((step, index) => {
                return (
                  <div
                    key={step}
                    className={`btn ${index <= activeStep ? 'btn-primary' : 'btn-default'}`}
                    style={index === activeStep ? { fontWeight: 'bold' } : undefined}
                  >
                    {index + 1}. {step}
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
          config={_.merge({
            fields: {},
            actions: []
          }, config)}
        />
      </div>
    );
  }

});

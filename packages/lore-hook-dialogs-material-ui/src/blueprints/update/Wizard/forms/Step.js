import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CardTitle, Stepper, Step, StepLabel } from 'material-ui';
import { result as _result } from 'lore-utils';
import { SchemaForm, RequestError } from 'lore-hook-forms-material-ui';

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
        <CardTitle title={`Update ${_.capitalize(modelName)}`} />
        {hasError ? (
          <div className="row">
            <div className="col-md-12">
              <RequestError request={request}>
                {(request) => {
                  return request.error;
                }}
              </RequestError>
            </div>
          </div>
        ) : null}
        {steps ? (
          <Stepper activeStep={activeStep}>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>
                    {step}
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
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

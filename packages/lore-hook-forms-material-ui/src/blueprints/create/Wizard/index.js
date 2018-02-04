import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Overlay, Request } from 'lore-react-forms-material-ui';
import Step from './forms/Step';
import Confirmation from './forms/Confirmation';

const formMap = {
  step: {
    render: (props, config) => {
      return (
        <Step
          {...props}
          {...config}
        />
      );
    }
  },
  confirmation: {
    render: (props, config) => {
      return (
        <Confirmation
          {...props}
          {...config}
        />
      );
    }
  }
};

export default createReactClass({
  displayName: 'Wizard',

  propTypes: {
    steps: PropTypes.array.isRequired,
    modelName: PropTypes.string.isRequired
  },

  getInitialState() {
    const { data } = this.props;

    return {
      stepIndex: 0,
      data: data || {},
      isSaving: false,
      request: null,
      hasError: false
    }
  },

  request: function(data) {
    const { modelName } = this.props;
    return lore.actions[modelName].create(data).payload;
  },

  onSubmit: function (newData) {
    const { data } = this.state;
    const nextData = _.extend({}, data, newData);

    this.setState({
      isSaving: true,
      hasError: false,
      data: nextData,
      request: this.request(nextData)
    });
  },

  onRequestSuccess: function (request) {
    const { steps } = this.props;
    const lastStepIndex = steps.length - 1;

    this.setState({
      isSaving: false,
      request: request,
      hasError: false,
      stepIndex: lastStepIndex
    });
  },

  onRequestError: function (request) {
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
  },

  onResetWizard: function () {
    this.setState(_.extend(this.getInitialState(), {
      stepIndex: 0
    }));
  },

  onNext: function (newData, newStepIndex) {
    const {
      data,
      stepIndex
    } = this.state;

    this.setState({
      stepIndex: newStepIndex || (stepIndex + 1),
      data: _.extend({}, data, newData)
    });
  },

  onPrevious: function (newData, newStepIndex) {
    const {
      data,
      stepIndex
    } = this.state;

    this.setState({
      stepIndex: newStepIndex || (stepIndex - 1),
      data: _.extend({}, data, newData)
    });
  },

  onChangeStep(newData, newStepIndex) {
    const {data} = this.state;

    this.setState({
      stepIndex: newStepIndex,
      data: _.extend({}, data, newData)
    });
  },

  render: function () {
    const {
      config,
      steps,
      modelName
    } = this.props;

    const {
      data,
      stepIndex,
      request,
      isSaving,
      hasError
    } = this.state;

    const {
      schemas,
      fieldMap,
      actionMap
    } = lore.config.forms;

    const stepConfig = steps[stepIndex];
    const form = formMap[stepConfig.form];

    const step = form.render({
      data: data,
      schema: schemas.default,
      fieldMap: fieldMap,
      actionMap: actionMap,
      hasError: hasError,
      request: request,
      callbacks: {
        onNext: (newData, nextStep) => {
          this.onNext(newData, nextStep)
        },
        onPrevious: (newData, nextStep) => {
          this.onPrevious(newData, nextStep)
        },
        onSubmit: (newData) => {
          this.onSubmit(newData)
        },
        onResetWizard: this.onResetWizard
      }
    }, stepConfig);

    return (
      <Overlay isVisible={isSaving}>
        <div>
          {(request && isSaving) ? (
            <Request
              request={request}
              reducer={modelName}
              onSuccess={this.onRequestSuccess}
              onError={this.onRequestError}
            />
          ) : null}
          {step}
        </div>
      </Overlay>
    );
  }

});

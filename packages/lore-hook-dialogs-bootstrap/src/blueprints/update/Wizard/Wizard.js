import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Overlay, Request } from 'lore-react-forms-bootstrap';
import formMap from './formMap';

export default createReactClass({
  displayName: 'Wizard',

  propTypes: {
    steps: PropTypes.array.isRequired
  },

  getInitialState() {
    const {
      model,
      data
    } = this.props;

    return {
      key: 0,
      stepIndex: 0,
      data: _.merge({}, data, model.data),
      isSaving: false,
      request: null,
      hasError: false
    }
  },

  request: function(data) {
    const { modelName } = this.props;
    const { model } = this.props;
    return lore.actions[modelName].update(model, data).payload;
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

  onCancel: function(data) {
    this.props.onCancel(data);
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
      key: this.state.key + 1
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
    const { modelName } = this.props;
    const {
      schema,
      fieldMap,
      actionMap,
      steps
    } = this.props;

    const {
      key,
      data,
      stepIndex,
      request,
      isSaving,
      hasError
    } = this.state;

    const stepConfig = steps[stepIndex];
    const form = formMap[stepConfig.form];

    const step = form.render({
      modelName: modelName,
      data: data,
      schema: schema,
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
        onCancel: this.onCancel,
        onResetWizard: this.onResetWizard
      }
    }, stepConfig);

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <Overlay isVisible={isSaving}>
            <div key={key}>
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
        </div>
      </div>
    );
  }

});

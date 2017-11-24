import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';

import Dialog from '../../../src/decorators/Dialog';

export default Dialog()(createReactClass({
  displayName: 'WizardTemplate',

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
    const { model } = this.props;

    return {
      stepIndex: 0,
      data: model ? model.data : {}
    }
  },

  onResetWizard: function() {
    this.setState(this.getInitialState());
  },

  onChange: function(name, value) {
    const data = _.merge({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  onNext: function() {
    this.setState({
      stepIndex: this.state.stepIndex + 1
    });
  },

  onPrevious: function() {
    this.setState({
      stepIndex: this.state.stepIndex - 1
    });
  },

  onRequestSuccess: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      showSuccessMessage: true,
      hasError: false
    });
    this.onNext();
  },

  onRequestError: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
    this.onPrevious();
  },

  render: function() {
    const {
      model,
      schema,
      formMap,
      fieldMap,
      actionMap,
      config: {
        steps
      },
      onCancel
    } = this.props;

    const {
      stepIndex,
      data,
      request
    } = this.state;

    const callbacks = {
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      onRequestSuccess: this.onRequestSuccess,
      onRequestError: this.onRequestError,
      onResetWizard: this.onResetWizard,
      onCancel: onCancel
    };

    const config = steps[stepIndex];

    return formMap[steps[stepIndex].form]({
      model: model,
      data: data,
      onChange: this.onChange,
      request: request,
      schema: schema,
      formMap: formMap,
      fieldMap: fieldMap,
      actionMap: actionMap,
      callbacks: callbacks,
      config: config
    });
  }

}));

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import WizardDynamicSchemaTemplate from './WizardDynamicSchemaTemplate';

export default createReactClass({
  displayName: 'RequestWizardDynamicSchemaTemplate',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    const {
      config
    } = this.props;

    return {
      stepIndex: config.stepIndex || 0
    }
  },

  onRequestSuccess: function() {
    this.setState({
      isSaving: false,
      request: null,
      showSuccessMessage: true,
      hasError: false
    });
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
      callbacks,
      ...other
    } = this.props;

    const {
      request,
      isSaving,
      hasError
    } = this.state;

    const modifiedCallbacks = _.defaults({}, callbacks, {
      onRequestSuccess: this.onRequestSuccess,
      onRequestError: this.onRequestError,
    });

    return (
      <WizardDynamicSchemaTemplate
        callbacks={modifiedCallbacks}
        request={request}
        {...other}
      />
    )
  }

});

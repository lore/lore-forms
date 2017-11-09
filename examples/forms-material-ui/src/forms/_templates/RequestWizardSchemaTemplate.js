import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui';
import Overlay from './_common/Overlay';
import Request from './_common/Request';
import RequestError from './_common/RequestError';
import SuccessMessage from './_common/SuccessMessage';
import ErrorMessage from './_common/ErrorMessage';
import WizardSchemaTemplate from './WizardSchemaTemplate';

export default createReactClass({
  displayName: 'RequestWizardSchemaTemplate',

  propTypes: {
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isSaving: false,
      request: null,
      showSuccessMessage: false,
      hasError: false,
      stepIndex: 0,
      data: {}
    }
  },

  onSubmit: function(data) {
    this.setState({
      isSaving: true,
      showSuccessMessage: false,
      hasError: false,
      request: lore.actions.tweet.create({
        userId: data.userId,
        text: data.text,
        createdAt: moment().unix()
      }).payload
    });
    this.onNext(data);
  },

  onNext: function(data) {
    this.setState({
      // data: _.merge({}, this.state.data, data),
      stepIndex: this.state.stepIndex + 1
    });
  },

  onPrevious: function(data) {
    this.setState({
      // data: _.merge({}, this.state.data, data),
      stepIndex: this.state.stepIndex - 1
    });
  },

  onRequestSuccess: function() {
    this.setState({
      isSaving: false,
      request: null,
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
    let {
      config: {
        template
      },
      callbacks
    } = this.props;

    const {
      request,
      isSaving,
      showSuccessMessage,
      hasError,
      stepIndex
    } = this.state;

    callbacks = _.defaults({}, callbacks, {
      onSubmit: this.onSubmit,
      onNext: this.onNext,
      onPrevious: this.onPrevious,
      onRequestSuccess: this.onRequestSuccess,
      onRequestError: this.onRequestError
    });

    return (
      <Overlay isVisible={isSaving}>
        <div>
          {(request && !hasError) ? (
            <Request
              request={request}
              reducer="tweet"
              onSuccess={this.onRequestSuccess}
              onError={this.onRequestError}
            />
          ) : null }
          <WizardSchemaTemplate
            {...this.props}
            stepIndex={stepIndex}
            callbacks={callbacks}
            props={{
              request: request
            }}
            alert={showSuccessMessage ? (
              <SuccessMessage />
            ) : (
              <RequestError request={request}>
                {(request) => {
                  return request.error.message;
                }}
              </RequestError>
            )}
          />
        </div>
      </Overlay>
    );
  }

});

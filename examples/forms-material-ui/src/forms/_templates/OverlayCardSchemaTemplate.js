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
import CardSchemaTemplate from './CardSchemaTemplate';

export default createReactClass({
  displayName: 'OverlayCardSchemaTemplate',

  propTypes: {
    config: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isSaving: false,
      request: null,
      showSuccessMessage: false,
      hasError: false
    }
  },

  onSubmit: function(data) {
    this.setState({
      isSaving: true,
      request: lore.actions.tweet.create({
        userId: data.userId,
        text: data.text,
        createdAt: moment().unix()
      }).payload,
      showSuccessMessage: false,
      hasError: false
    });
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
      hasError
    } = this.state;

    const templateProps = template.props();

    callbacks = _.defaults({}, callbacks, {
      onSubmit: this.onSubmit
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
          <CardSchemaTemplate
            {...this.props}
            callbacks={callbacks}
            alert={showSuccessMessage ? (
              <SuccessMessage
                title="Success!"
                message="Tweet posted."
              />
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

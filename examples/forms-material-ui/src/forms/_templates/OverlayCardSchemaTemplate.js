import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui';
import Overlay from './_common/Overlay';
import Request from './_common/Request';
import RequestError from './_common/RequestError';
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
      showSuccessMessage: false
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
      showSuccessMessage: false
    });
  },

  onRequestSuccess: function() {
    this.setState({
      isSaving: false,
      request: null,
      showSuccessMessage: true
    });
  },

  onRequestError: function(request) {
    this.setState({
      isSaving: false,
      request: request
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
      isSaving
    } = this.state;

    const templateProps = template.props();

    callbacks = _.defaults({}, callbacks, {
      onSubmit: this.onSubmit
    });

    return (
      <Overlay isVisible={isSaving}>
        <div>
          {request ? (
            <Request
              request={request}
              reducer="tweet"
              onSuccess={this.onRequestSuccess}
              onError={this.onRequestError}
            />
          ) : null }
          <RequestError request={request} />
          <CardSchemaTemplate
            {...this.props}
            callbacks={callbacks}
          />
        </div>
      </Overlay>
    );
  }

});

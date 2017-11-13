import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui';
import Overlay from '../../forms/_templates/_common/Overlay';
import Request from '../../forms/_templates/_common/Request';
import RequestError from '../../forms/_templates/_common/RequestError';
import SuccessMessage from '../../forms/_templates/_common/SuccessMessage';
import formConfig from '../../forms/tweet/overlay';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';

export default createReactClass({
  displayName: 'CreateCard.overlay.config.1',

  getInitialState: function() {
    return {
      key: 0,
      isSaving: false,
      showSuccessMessage: false,
      hasError: false,
      request: null,
      data: {
        userId: null,
        text: ''
      }
    }
  },

  onResetForm: function() {
    const { key } = this.state;
    const initialData = this.getInitialState().data;

    this.setState({
      key: key + 1,
      data: initialData
    });
  },

  onSubmit: function() {
    const { data } = this.state;

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
  },

  onChange: function(name, value) {
    const data = _.merge({}, this.state.data);
    data[name] = value;
    this.setState({
      data: data
    });
  },

  onRequestSuccess: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      showSuccessMessage: true,
      hasError: false
    });
    this.onResetForm();
  },

  onRequestError: function(request) {
    this.setState({
      isSaving: false,
      request: request,
      hasError: true
    });
  },

  render: function() {
    const {
      key,
      data,
      request,
      isSaving,
      showSuccessMessage,
      hasError
    } = this.state;

    const callbacks = {
      onSubmit: this.onSubmit
    };

    return (
      <Overlay key={key} isVisible={isSaving}>
        <Card className="form-card">
          <CardTitle
            title="Create Tweet"
            subtitle="Enter text and select the user to tweet it"
          />
          {(request && isSaving) ? (
            <Request
              request={request}
              reducer="tweet"
              onSuccess={this.onRequestSuccess}
              onError={this.onRequestError}
            />
          ) : null}
          {showSuccessMessage ? (
            <SuccessMessage
              title="Success!"
              message="Tweet posted."
            />
          ) : null}
          {hasError ? (
            <RequestError request={request}>
              {(request) => {
                return request.error.message;
              }}
            </RequestError>
          ) : null}
          <SchemaForm
            key={key}
            data={data}
            // validators={validators}
            onChange={this.onChange}
            callbacks={callbacks}
            schema={lore.config.forms.schemas.default}
            formMap={lore.config.forms.formMap}
            fieldMap={lore.config.forms.fieldMap}
            actionMap={lore.config.forms.actionMap}
            config={formConfig}
          />
        </Card>
      </Overlay>
    );
  }

});

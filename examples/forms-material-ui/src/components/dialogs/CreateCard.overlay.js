import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { Card, CardTitle, RaisedButton } from 'material-ui';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField, AutoCompleteField } from 'lore-react-forms-material-ui';
import validators from '../../utils/validators';
import { Connect } from 'lore-hook-connect';
import Overlay from '../../forms/_templates/_common/Overlay';
import Request from '../../forms/_templates/_common/Request';
import RequestError from '../../forms/_templates/_common/RequestError';
import SuccessMessage from '../../forms/_templates/_common/SuccessMessage';
import Dialog from '../../decorators/Dialog';

const TheDialog = Dialog()(createReactClass({
  displayName: 'CreateCard.overlay',

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

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
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
    const validators = this.getValidators(data);

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
          <Form
            key={key}
            data={data}
            validators={validators}
            onChange={this.onChange}>
            {(form) => (
              <FormSection>
                <FormSection className="mui-card-text">
                  <FormSection className="row">
                    <FormSection className="col-md-12">
                      <TextField
                        name="text"
                        props={{
                          floatingLabelText: "Text",
                          style: { width: '100%' },
                          multiLine: true
                        }}
                      />
                    </FormSection>
                  </FormSection>
                  <FormSection className="row">
                    <FormSection className="col-md-12">
                      <Connect callback={(getState, props) => {
                        return {
                          options: getState('user.find')
                        }
                      }}>
                        <AutoCompleteField
                          floatingLabelText="User"
                          name="userId"
                          field="username"
                        />
                      </Connect>
                    </FormSection>
                  </FormSection>
                </FormSection>
                <FormSection className="mui-card-actions">
                  <PropBarrier>
                    <RaisedButton
                      label="Save"
                      primary={true}
                      disabled={form.hasError}
                      onTouchTap={this.onSubmit}
                    />
                  </PropBarrier>
                </FormSection>
              </FormSection>
            )}
          </Form>
        </Card>
      </Overlay>
    );
  }

}));

export default createReactClass({
  displayName: 'CreateCard.overlay',

  onClick: function() {
    lore.dialog.show(() => {
      return (
        <TheDialog />
      );
    });
  },

  render: function() {
    return (
      <div>
        <RaisedButton
          label="Open Dialog"
          primary={true}
          onTouchTap={this.onClick}
        />
      </div>
    );
  }

});

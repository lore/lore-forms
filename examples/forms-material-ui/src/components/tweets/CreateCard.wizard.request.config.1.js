import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { FlatButton, RaisedButton, Card, CardTitle, Stepper, Step, StepLabel, CircularProgress } from 'material-ui';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField, AutoCompleteField } from 'lore-react-forms-material-ui';
import validators from '../../utils/validators';
import Connect from '../Connect';
import Request from '../../forms/_templates/_common/Request';
import RequestError from '../../forms/_templates/_common/RequestError';
import wizardConfig from '../../forms/tweet/wizard';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';

export default createReactClass({
  displayName: 'CreateCard.wizard.request',

  getInitialState: function() {
    return {
      stepIndex: 0,
      data: {
        userId: null,
        text: ''
      }
    }
  },

  onResetWizard: function() {
    this.setState(this.getInitialState());
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
    this.onNext();
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

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },

  render: function() {
    const {
      stepIndex,
      data,
      request
    } = this.state;
    const validators = this.getValidators(data);

    if (stepIndex === 0) {
      return (
        <Card className="form-card">
          <CardTitle
            title="Create Tweet"
            subtitle="Enter text and select the user to tweet it"
          />
          <RequestError request={request} />
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>
                Enter Text
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                Select User
              </StepLabel>
            </Step>
          </Stepper>
          <SchemaForm
            data={data}
            validators={_.pick(validators, ['text'])}
            onChange={this.onChange}
            callbacks={{
              onNext: this.onNext
            }}
            schema={lore.config.forms.schemas.default}
            formMap={lore.config.forms.formMap}
            fieldMap={lore.config.forms.fieldMap}
            actionMap={lore.config.forms.actionMap}
            config={wizardConfig.steps[stepIndex]}
          />
        </Card>
      );
    }

    if (stepIndex === 1) {
      return (
        <Card className="form-card">
          <CardTitle
            title="Create Tweet"
            subtitle="Enter text and select the user to tweet it"
          />
          <RequestError request={request} />
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>
                Enter Text
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                Select User
              </StepLabel>
            </Step>
          </Stepper>
          <SchemaForm
            data={data}
            validators={_.pick(validators, ['userId'])}
            onChange={this.onChange}
            callbacks={{
              onNext: this.onNext,
              onPrevious: this.onPrevious
            }}
            schema={lore.config.forms.schemas.default}
            formMap={lore.config.forms.formMap}
            fieldMap={lore.config.forms.fieldMap}
            actionMap={lore.config.forms.actionMap}
            config={wizardConfig.steps[stepIndex]}
          />
        </Card>
      );
    }

    if (stepIndex === 2) {
      return (
        <Card className="form-card">
          <Request
            request={request}
            reducer="tweet"
            onSuccess={this.onRequestSuccess}
            onError={this.onRequestError}
          >
            <div>
              <div className="mui-card-text">
                <div className="row">
                  <div className="col-md-12">
                    <div className="request-status">
                      <CircularProgress />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Request>
        </Card>
      );
    }

    if (stepIndex === 3) {
      return (
        <Card style={{ paddingTop: '16px', paddingBottom: '24px'}}>
          <div className="mui-card-text">
            <div className="row">
              <div className="col-md-12">
                <div className="text-center">
                  <h2 style={{ padding: 0, margin: 0 }}>
                    Tweet posted!
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="mui-card-actions">
            <div className="text-center">
              <RaisedButton
                label="Create Another"
                primary={true}
                onTouchTap={this.onResetWizard}
              />
            </div>
          </div>
        </Card>
      );
    }


  }

});

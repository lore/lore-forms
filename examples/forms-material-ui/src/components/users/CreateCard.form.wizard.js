import React from 'react';
import { Card, CardTitle, FlatButton, CircularProgress, RaisedButton } from 'material-ui';
import { Stepper, Step, StepLabel } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField, DynamicTextField, SelectField } from 'lore-react-forms-material-ui';
import { NavigationCheck, AvNotInterested } from 'material-ui/svg-icons';
import PayloadStates from '../../constants/PayloadStates';
import validators from '../../utils/validators';
import Overlay from '../_common/Overlay';
import Connect from '../Connect';
import FormSteps from '../common/FormSteps';
import FormStep from '../common/FormStep';
import RequestError from '../common/RequestError';
import Request from '../common/Request';
import SuccessMessage from '../common/SuccessMessage';

export default createReactClass({
  displayName: 'CreateCard.form',

  getInitialState: function() {
    return {
      stepIndex: 0,
      request: null,
      name: '',
      username: '',
      avatar: '',
      password: '',
      confirmPassword: '',
      country: null,
      region: null
    }
  },

  resetState: function() {
    this.setState(this.getInitialState());
  },

  componentWillReceiveProps: function (nextProps) {
    var user = this.state.user;

    if (!user) {
      return;
    }

    var nextUser = lore.store.getState().user.byCid[user.cid];

    if (nextUser.state === PayloadStates.RESOLVED) {
      this.setState({
        user: null
      })
    } else {
      this.setState({
        user: nextUser
      })
    }
  },

  onSubmit: function() {
    var params = _.omit(this.state, ['user']);
    var action = lore.actions.user.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      user: action.payload
    });
  },

  getOptions: function(getState, props) {
    return {
      options: getState('user.find')
    }
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;

    // reset the region when the country changes
    if (name === 'country') {
      state.region = null;
    }

    this.setState(state);
  },

  getValidators: function(data) {
    return {
      name: [validators.isRequired],
      username: [validators.isRequired],
      avatar: [validators.isUrl],
      password: [validators.isRequired],
      confirmPassword: [validators.isPasswordMatch.bind(null, data.password)],
      country: [validators.number.isRequired],
      region: [validators.number.isRequired],
    }
  },

  connectUsername: function(getState, props) {
    var username = this.state.username;

    if (!username) {
      return {
        _model: null
      }
    }

    return {
      _model: getState('username.byId', {
        id: username
      })
    }
  },

  getUsernameMessage: function(model) {
    var options = {
      icon: null,
      message: ''
    };

    if (!model) {
      return options;
    } else if (model.state === PayloadStates.FETCHING) {
      options.icon = (
        <CircularProgress
          style={{
            position: 'absolute',
            top: '36px',
            right: '16px'
          }}
          size={16}
          thickness={2} />
      );
    } else if (model.state === PayloadStates.NOT_FOUND) {
      options.icon = (
        <NavigationCheck
          style={{
            position: 'absolute',
            top: '36px',
            right: '16px',
            color: 'green'
          }} />
      );
    } else if (model.state === PayloadStates.RESOLVED) {
      options.icon = (
        <AvNotInterested
          style={{
            position: 'absolute',
            top: '36px',
            right: '16px',
            color: 'red'
          }} />
      );
      options.message = 'Username is already taken';
    }

    return options;
  },

  getRegions: function(getState, props) {
    var countryId = props.data.country;

    if (countryId) {
      return {
        options: getState('region.find', {
          where: {
            countryId: countryId
          }
        })
      }
    }

    return {
      options: {
        data: []
      }
    }
  },

  onNext: function(data) {
    const { stepIndex } = this.state;
    let nextState = _.extend({}, this.state, data);

    if (stepIndex > 0) {
      this.setState(nextState);
    }

    if (stepIndex === 1) {
      this.setState({
        request: lore.actions.user.create({
          name: nextState.name,
          username: nextState.username,
          password: nextState.password,
          avatar: nextState.avatar,
          country: nextState.country,
          region: nextState.region,
          createdAt: moment().unix()
        }).payload
      });
    }

    this.setState({
      stepIndex: stepIndex + 1
    });
  },

  onPrevious: function() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex - 1
    });
  },

  onRequestError: function(request) {
    this.setState({
      request: request
    });
    this.onPrevious();
  },

  getForm: function() {
    var data = _.omit(this.state, ['user']);
    var validators = _.omit(this.getValidators(data), ['country', 'region']);

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}>
        {(form) => (
          <FormSection>
            <FormSection className="mui-card-text">
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    style={{ width: '100%' }}
                    floatingLabelText="Name *"
                    name="name"
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={this.connectUsername}>
                    <DynamicTextField
                      style={{ width: '100%' }}
                      floatingLabelText="Username *"
                      name="username"
                      getMessage={this.getUsernameMessage}
                    />
                  </Connect>
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    style={{ width: '100%' }}
                    floatingLabelText="Avatar (optional)"
                    hintText="https://some.image/url"
                    name="avatar"
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    style={{ width: '100%' }}
                    floatingLabelText="Password *"
                    name="password"
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    style={{ width: '100%' }}
                    floatingLabelText="Confirm Password *"
                    name="confirmPassword"
                  />
                </FormSection>
              </FormSection>
            </FormSection>
            <FormSection className="mui-card-actions">
              <PropBarrier>
                <FlatButton
                  label="Back"
                  onTouchTap={this.onPrevious}
                />
                <RaisedButton
                  label="Next"
                  disabled={form.hasError}
                  primary={true}
                  onTouchTap={this.onNext}
                />
              </PropBarrier>
            </FormSection>
          </FormSection>
        )}
      </Form>
    );
  },

  getForm2: function() {
    var data = _.omit(this.state, ['user']);
    var validators = _.pick(this.getValidators(data), ['country', 'region']);

    return (
      <Form
        data={data}
        validators={validators}
        onChange={this.onChange}>
        {(form) => (
          <FormSection>
            <FormSection className="mui-card-text">
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <SelectField
                    style={{ width: '100%' }}
                    floatingLabelText="Country *"
                    name="country"
                    field="name"
                    options={lore.getState('country.find')}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={this.getRegions}>
                    <SelectField
                      style={{ width: '100%' }}
                      floatingLabelText="Region *"
                      name="region"
                      field="name"
                    />
                  </Connect>
                </FormSection>
              </FormSection>
            </FormSection>
            <FormSection className="mui-card-actions">
              <PropBarrier>
                <FlatButton
                  label="Back"
                  onTouchTap={this.onPrevious}
                />
                <RaisedButton
                  label="Next"
                  disabled={form.hasError}
                  primary={true}
                  onTouchTap={this.onNext}
                />
              </PropBarrier>
            </FormSection>
          </FormSection>
        )}
      </Form>
    );
  },

  render: function() {
    const {
      stepIndex,
      request,
      user
    } = this.state;

    return (
      <Overlay model={user}>
        <Card className="form-card">
          <CardTitle
            title="Create User"
            subtitle="Enter fields to describe the user"
          />
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Account</StepLabel>
            </Step>
            <Step>
              <StepLabel>Demographics</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
          <FormSteps stepIndex={stepIndex}>
            <FormStep>
              <RequestError request={request} />
              {this.getForm()}
            </FormStep>
            <FormStep>
              <RequestError request={request} />
              {this.getForm2()}
            </FormStep>
            <FormStep>
              <Request
                request={request}
                reducer="user"
                onSuccess={this.onNext}
                onError={this.onRequestError}
              />
            </FormStep>
            <FormStep>
              <SuccessMessage onNext={this.resetState}>
                <div>
                  User has been created! Click next to reset the form.
                </div>
              </SuccessMessage>
            </FormStep>
          </FormSteps>
        </Card>
      </Overlay>
    );
  }

});

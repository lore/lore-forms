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
import Template from '../../forms/_templates/Template';
import userConfig from '../../models/user';

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

  onNext: function(data) {
    const { stepIndex } = this.state;
    let nextState = _.extend({}, this.state, data);

    if (stepIndex > 0) {
      this.setState(nextState);
    }

    if (stepIndex === 1) {
      console.log(this.state);
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
    var data = this.state;
    var templateProps = _.merge({}, {
      fields: _.pick(userConfig.forms.fields, [
        'name',
        'username',
        'avatar',
        'password',
        'confirmPassword'
      ]),
      actions: userConfig.forms.actions,
      onChange: userConfig.forms.onChange
    }, {
      // fields: {
      //   text: {
      //     data: data.text
      //   },
      //   userId: {
      //     data: data.userId
      //   }
      // },
      onSubmit: this.onSubmit
    });

    return (
      <Template {...templateProps} />
    );
  },

  getForm2: function() {
    var data = this.state;
    var templateProps = _.merge({}, {
      fields: _.pick(userConfig.forms.fields, [
        'country',
        'region'
      ]),
      actions: userConfig.forms.actions,
      onChange: userConfig.forms.onChange
    }, {
      // fields: {
      //   text: {
      //     data: data.text
      //   },
      //   userId: {
      //     data: data.userId
      //   }
      // },
      onSubmit: this.onSubmit
    });

    return (
      <Template {...templateProps} />
    );
  },

  render: function() {
    const {
      stepIndex,
      request,
      user
    } = this.state;

    var config = {
      steps: [
        {
          name: 'Explanation',
          type: 'text',
          render: function() {
            return (
              <div>
                This is an explanation.
              </div>
            );
          }
        },
        {
          name: 'Account',
          type: 'form',
          fields: _.pick(userConfig.forms.fields, [
            'name',
            'username',
            'avatar',
            'password',
            'confirmPassword'
          ]),
          actions: [
            {
              type: 'cancel',
              options: {
                label: 'Back',
                // onTouchTap: this.onSubmit
              }
            },
            {
              type: 'submit',
              options: {
                label: 'Next',
                // onTouchTap: this.onSubmit
              }
            }
          ],
          onChange: userConfig.forms.onChange
        },
        {
          name: 'Demographics',
          type: 'form',
          fields: _.pick(userConfig.forms.fields, [
            'country',
            'region',
          ]),
          actions: [
            {
              type: 'cancel',
              options: {
                label: 'Back',
                // onTouchTap: this.onSubmit
              }
            },
            {
              type: 'submit',
              options: {
                label: 'Next',
                // onTouchTap: this.onSubmit
              }
            }
          ],
          onChange: userConfig.forms.onChange
        }
      ]
    };

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

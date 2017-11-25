import React from 'react';
import { Card, CardTitle, RaisedButton } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';
import validators from '../../utils/validators';
import Overlay from '../_common/Overlay';
import TemplateForm from './templates/TemplateForm';
import UsernameField from './templates/fields/UsernameField';
import { getState } from 'lore-hook-connect';

export default createReactClass({
  displayName: 'CreateCard.template.wizard.concept',

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

  onCreateUser: function() {
    const nextState = this.state;
    this.setState({
      request: lore.actions.user.create({
        name: nextState.name || 'Test',
        username: nextState.username || 'test',
        password: nextState.password,
        avatar: nextState.avatar || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
        country: nextState.country,
        region: nextState.region,
        createdAt: moment().unix()
      }).payload
    });
    this.onNext();
  },

  onNext: function() {
    const { stepIndex } = this.state;
    let nextState = _.extend({}, this.state);

    if (stepIndex > 0) {
      this.setState(nextState);
    }

    // if (stepIndex === 1) {
    //   this.onCreateUser();
    // }

    this.setState({
      stepIndex: stepIndex + 1
    });
  },

  onPrevious: function(data) {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  },

  onRequestError: function(request) {
    this.setState({
      request: request
    });
    this.onPrevious();
  },

  onChange: function(name, value) {
    const state = {};
    state[name] = value;

    // reset the region when the country changes
    if (name === 'country') {
      state.region = null;
    }

    this.setState(state);
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
          <TemplateForm config={{
            stepIndex: stepIndex,
            steps: [
              {
                name: 'Account',
                type: 'form',
                data: this.state,
                // validators: function(data) {
                //   const username = data.username ? getState('username.byId', {
                //     id: data.username
                //   }) : null;
                //
                //   return {
                //     name: [validators.isRequired],
                //     username: [
                //       validators.isRequired,
                //       validators.usernameIsAvailable(username)
                //     ],
                //     avatar: [validators.isUrl],
                //     password: [validators.isRequired],
                //     confirmPassword: [
                //       validators.isRequired,
                //       validators.matchesPassword(data.password)
                //     ]
                //   }
                // },
                onChange: this.onChange,
                request: request,
                fields: {
                  name: {
                    type: 'string',
                    props: {
                      floatingLabelText: 'Name *'
                    }
                  },
                  username: {
                    type: 'custom',
                    render: function(props) {
                      return (
                        <UsernameField
                          {...props}
                          props={{
                            floatingLabelText: 'Username  *'
                          }}
                        />
                      );
                    }
                  },
                  avatar: {
                    type: 'string',
                    props: {
                      floatingLabelText: 'Avatar (optional)',
                      hintText: 'https://some.image/url'
                    }
                  },
                  password: {
                    type: 'string',
                    props: {
                      floatingLabelText: 'Password *'
                    }
                  },
                  confirmPassword: {
                    type: 'string',
                    props: {
                      floatingLabelText: 'Confirm Password *'
                    }
                  },
                },
                actions: [
                  {
                    type: 'flat',
                    props: {
                      label: 'Back',
                      onTouchTap: this.onPrevious
                    }
                  },
                  {
                    type: 'raised',
                    props: (form) => {
                      return {
                        label: 'Next',
                        disabled: form.hasError,
                        onTouchTap: this.onCreateUser
                      }
                    }
                  }
                ]
              },
              {
                name: 'Request 1',
                type: 'request',
                includeInStepper: false,
                props: {
                  request: this.state.request,
                  reducer: 'user',
                  onSuccess: this.onNext,
                  onError: this.onRequestError
                }
              },
              {
                name: 'Demographics',
                type: 'form',
                data: this.state,
                validators: {
                  // country: [validators.number.isRequired],
                  // region: [validators.number.isRequired]
                },
                onChange: this.onChange,
                fields: {
                  country: {
                    type: 'select',
                    props: {
                      floatingLabelText: 'Country',
                      field: 'name',
                      callback: function(getState, props) {
                        return {
                          options: getState('country.find')
                        }
                      }
                    }
                  },
                  region: {
                    type: 'select',
                    props: function(form) {
                      return {
                        floatingLabelText: 'Region',
                        disabled: !form.data.country,
                        field: 'name',
                        callback: function(getState, props) {
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
                        }
                      }
                    }
                  }
                },
                actions: [
                  {
                    type: 'flat',
                    props: {
                      label: 'Back',
                      onTouchTap: this.onPrevious
                    }
                  },
                  {
                    type: 'raised',
                    props: (form) => {
                      return {
                        label: 'Next',
                        disabled: form.hasError,
                        onTouchTap: this.onCreateUser
                      }
                    }
                  }
                ]
              },
              {
                name: 'Request',
                type: 'request',
                includeInStepper: false,
                props: {
                  request: this.state.request,
                  reducer: 'user',
                  onSuccess: this.onNext,
                  onError: this.onRequestError
                }
              },
              {
                name: 'Confirmation',
                type: 'custom',
                render: () => {
                  return (
                    <div>
                      <div className="mui-card-text">
                        <div className="row">
                          <div className="col-md-12">
                            <div>User created!</div>
                          </div>
                        </div>
                      </div>
                      <div className="mui-card-actions">
                        <RaisedButton
                          label="Reset Form"
                          primary={true}
                          onTouchTap={this.resetState}
                        />
                      </div>
                    </div>
                  )
                }
              }
            ]
          }} />
        </Card>
      </Overlay>
    );
  }

});

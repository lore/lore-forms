import React from 'react';
import { Card, CardTitle, CircularProgress } from 'material-ui';
import { NavigationCheck, AvNotInterested } from 'material-ui/svg-icons';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';
import validators from '../../utils/validators';
import Overlay from '../common/Overlay';
// import Template from '../templates/Template';
// import userConfig from '../../models/user';
// import FormSteps from './templates/FormSteps';
import TemplateForm from './templates/TemplateForm';
import UsernameField from './templates/fields/UsernameField';
import { getState } from '../../../hooks/lore-hook-connect';

export default createReactClass({
  displayName: 'CreateCard.form',

  getInitialState: function() {
    return {
      stepIndex: 1,
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
        name: nextState.name,
        username: nextState.username,
        password: nextState.password,
        avatar: nextState.avatar,
        country: nextState.country,
        region: nextState.region,
        createdAt: moment().unix()
      }).payload
    });
  },

  onNext: function() {
    console.log(this.state);
    // return;

    const { stepIndex } = this.state;
    let nextState = _.extend({}, this.state);

    if (stepIndex > 0) {
      this.setState(nextState);
    }

    if (stepIndex < 1) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  },

  onPrevious: function(data) {
    console.log(this.state);
    // return;

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
    console.log(`Changing: ${name}:${value}`);
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
                validators: function(data) {
                  const username = data.username ? getState('username.byId', {
                    id: data.username
                  }) : null;

                  return {
                    name: [validators.isRequired],
                    username: [
                      validators.isRequired,
                      validators.usernameIsAvailable(username)
                    ],
                    avatar: [validators.isUrl],
                    password: [validators.isRequired],
                    confirmPassword: [
                      validators.isRequired,
                      validators.matchesPassword(data.password)
                    ]
                  }
                },
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
                        onTouchTap: this.onNext
                      }
                    }
                  }
                ]
              },
              {
                name: 'Password',
                type: 'form',
                data: this.state,
                validators: {
                  country: [validators.number.isRequired],
                  region: [validators.number.isRequired]
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
                        onTouchTap: this.onNext
                      }
                    }
                  }
                ]
              }
            ]
          }} />
        </Card>
      </Overlay>
    );
  }

});

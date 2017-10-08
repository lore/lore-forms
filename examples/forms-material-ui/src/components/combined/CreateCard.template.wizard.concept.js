import React from 'react';
import { Card, CardTitle, RaisedButton } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import moment from 'moment';
import validators from '../../utils/validators';
import Overlay from '../common/Overlay';
import TemplateForm from '../users/templates/TemplateForm';
import UsernameField from '../users/templates/fields/UsernameField';

export default createReactClass({
  displayName: 'CreateCard.combined.template.wizard.concept',

  getInitialState: function() {
    return {
      stepIndex: 0,

      userRequest: null,
      name: '',
      username: '',
      avatar: '',
      password: '',
      confirmPassword: '',
      country: null,
      region: null,

      tweetRequest: null,
      text: '',
      userId: null,
    }
  },

  resetState: function() {
    this.setState(this.getInitialState());
  },

  onCreateUser: function() {
    const nextState = this.state;
    this.setState({
      userRequest: lore.actions.user.create({
        name: nextState.name || 'Combined Name',
        username: nextState.username || 'combined_username',
        password: nextState.password,
        avatar: nextState.avatar || 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
        country: nextState.country,
        region: nextState.region,
        createdAt: moment().unix()
      }).payload
    });
    this.onNext();
  },

  onCreateTweet: function() {
    const nextState = this.state;
    this.setState({
      tweetRequest: lore.actions.tweet.create({
        text: nextState.text || 'Combined tweet text.',
        userId: nextState.userId || 1,
        createdAt: moment().unix()
      }).payload
    });
    this.onNext();
  },

  onUserCreated: function(request) {
    this.setState({
      userRequest: request,
      userId: request.id
    });
    this.onNext();
  },

  onTweetCreated: function(request) {
    this.setState({
      tweetRequest: request
    });
    this.onNext();
  },

  onNext: function() {
    const { stepIndex } = this.state;
    // let nextState = _.extend({}, this.state);
    //
    // if (stepIndex > 0) {
    //   this.setState(nextState);
    // }

    this.setState({
      stepIndex: stepIndex + 1
    });
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
                name: 'Request 1',
                type: 'request',
                includeInStepper: false,
                props: {
                  request: this.state.userRequest,
                  reducer: 'user',
                  onSuccess: this.onUserCreated,
                  onError: this.onRequestError
                }
              },
              {
                name: 'Tweet',
                type: 'form',
                data: this.state,
                validators: {
                  // country: [validators.number.isRequired],
                  // region: [validators.number.isRequired]
                },
                onChange: this.onChange,
                fields: {
                  text: {
                    type: 'text',
                    props: {
                      floatingLabelText: 'Text *'
                    }
                  },
                  userId: {
                    type: 'select',
                    props: {
                      floatingLabelText: 'User',
                      field: 'username',
                      disabled: true,
                      callback: function(getState, props) {
                        return {
                          options: getState('user.findAll')
                        }
                      }
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
                        onTouchTap: this.onCreateTweet
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
                  request: this.state.tweetRequest,
                  reducer: 'tweet',
                  onSuccess: this.onTweetCreated,
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

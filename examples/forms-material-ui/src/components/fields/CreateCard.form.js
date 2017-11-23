import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { RaisedButton } from 'material-ui';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField, PasswordField, SelectField, CheckboxField } from 'lore-react-forms-material-ui';
import UsernameField from '../_common/UsernameField';
import validators from '../../utils/validators';
import Connect from '../Connect';

let key = 0;

export default createReactClass({
  displayName: 'CreateCard.form',

  getInitialState: function() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      country: null,
      region: null,
      agreeToTerms: false
    }
  },

  onSubmit: function() {
    const {
      userId,
      text
    } = this.state;

    lore.actions.tweet.create({
      userId: userId,
      text: text,
      createdAt: moment().unix()
    });

    key = key + 1;

    this.setState(this.getInitialState());
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

  getValidators: function(data) {
    const {
      username,
      password
    } = data;

    const usernameModel = data.username ? lore.getState('user.first', {
      where: {
        username: username
      }
    }) : null;

    return {
      name: [validators.isRequired],
      username: [
        validators.isRequired,
        validators.isUsername,
        validators.usernameIsAvailable(usernameModel)
      ],
      password: [
        validators.isRequired,
        validators.isPassword
      ],
      confirmPassword: [
        validators.isRequired,
        validators.isPassword,
        validators.matchesPassword(password)
      ],
      country: [validators.number.isRequired],
      region: [validators.number.isRequired]
    }
  },

  render: function() {
    const data = this.state;
    const validators = this.getValidators(data);

    return (
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
                    name="name"
                    props={{
                      floatingLabelText: "Name",
                      style: { width: '100%' },
                      autoComplete: 'off'
                    }}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <UsernameField
                    name="username"
                    props={{
                      floatingLabelText: 'Username  *',
                      style: { width: '100%' }
                    }}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <PasswordField
                    name="password"
                    props={{
                      floatingLabelText: "Password",
                      style: { width: '100%' }
                    }}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <PasswordField
                    name="confirmPassword"
                    props={{
                      floatingLabelText: "Confirm Password",
                      style: { width: '100%' }
                    }}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={(getState, props) => {
                    return {
                      options: getState('country.find')
                    }
                  }}>
                    <SelectField
                      name="country"
                      props={{
                        floatingLabelText: "Country *",
                        style: { width: '100%' },
                        field: 'name'
                      }}
                    />
                  </Connect>
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={(getState, props) => {
                    const { country } = props.data;

                    if (country) {
                      return {
                        options: getState('region.find', {
                          where: {
                            countryId: country
                          }
                        })
                      }
                    }

                    return {
                      options: {
                        data: []
                      }
                    }
                  }}>
                    <SelectField
                      name="region"
                      props={{
                        floatingLabelText: "Region *",
                        disabled: !form.data.country,
                        style: { width: '100%' },
                        field: 'name'
                      }}
                    />
                  </Connect>
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <CheckboxField
                    name="agreeToTerms"
                    props={{
                      label: "Agree to Terms of Use *",
                      style: { width: '100%', paddingTop: '24px' }
                    }}
                  />
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
    );
  }

});

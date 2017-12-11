import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { RaisedButton, TextField, SelectField, MenuItem } from 'material-ui';
import { Form, FormSection, PropBarrier, Field } from 'lore-react-forms';
// import { TextField, AutoCompleteField, SelectField } from 'lore-react-forms-material-ui';
import validators from '../../utils/validators';
import { Connect } from 'lore-hook-connect';

let key = 0;

export default createReactClass({
  displayName: 'CreateCard.form',

  getInitialState: function() {
    return {
      userId: null,
      text: ''
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
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },

  render: function() {
    var data = this.state;
    var validators = this.getValidators(data);

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
                  <Field name="text">
                    {(field) => {
                      return (
                        <TextField
                          floatingLabelText="Text"
                          multiLine={true}
                          value={field.value}
                          onChange={(event, value) => {
                            form.onChange(field.name, value);
                          }}
                          onFocus={field.onFocus}
                          onBlur={field.onBlur}
                          errorText={field.touched && field.error}
                          style={{ width: '100%' }}
                        />
                      )
                    }}
                  </Field>
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Field name="userId">
                    {(field) => {
                      return (
                        <Connect callback={(getState, props) => {
                          return {
                            options: getState('user.find')
                          }
                        }}>
                          {(connect) => {
                            function mapDataToOptions(data, field) {
                              return data.map(function(datum) {
                                return {
                                  value: datum.id,
                                  text: datum.data[field]
                                };
                              });
                            }

                            function renderOption({ text, value }) {
                              return (
                                <MenuItem
                                  key={value}
                                  value={value}
                                  primaryText={text}
                                />
                              );
                            }

                            return (
                              <SelectField
                                floatingLabelText="User"
                                value={field.value}
                                onChange={(event, key, value) => {
                                  field.onBlur();
                                  field.onChange(field.name, value);
                                }}
                                errorText={field.touched && field.error}
                                style={{ width: '100%' }}
                              >
                                {[renderOption({ value: null, text: '' })].concat(
                                  connect.options.data.map((option) => {
                                    return renderOption({
                                      value: option.id,
                                      text: option.data['username']
                                    })
                                  })
                                )}
                              </SelectField>
                            )
                          }}
                        </Connect>
                      )
                    }}
                  </Field>
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

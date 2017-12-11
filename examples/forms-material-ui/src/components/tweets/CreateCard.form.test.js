import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { RaisedButton, TextField as MuiTextField } from 'material-ui';
import { Form, FormSection, PropBarrier, Field } from 'lore-react-forms';
import { TextField, AutoCompleteField, SelectField } from 'lore-react-forms-material-ui';
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
          <div>
            <div className="mui-card-text">
              <div className="row">
                <div className="col-md-12">
                  <TextField
                    name="text"
                    props={{
                      floatingLabelText: "Text",
                      style: { width: '100%' },
                      multiLine: true
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field name="text" data={form.data}>
                    {(field) => {
                      return (
                        <MuiTextField
                          floatingLabelText="Text"
                          value={form.data[field.name]}
                          onChange={(event, value) => {
                            field.onChange(field.name, Number(value))
                          }}
                          // onFocus={field.onFocus}
                          // onBlur={field.onBlur}
                          // errorText={field.touched && (errors[name] || errorText)}
                          style={{ width: '100%' }}
                        />
                      )
                    }}
                  </Field>
                </div>
              </div>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <Connect callback={(getState, props) => {
                    return {
                      options: getState('user.find')
                    }
                  }}>
                    <SelectField
                      name="userId"
                      props={{
                        floatingLabelText: "User",
                        style: { width: '100%' },
                        field: 'username'
                      }}
                    />
                  </Connect>
                </FormSection>
              </FormSection>
            </div>
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
          </div>
        )}
      </Form>
    );
  }

});

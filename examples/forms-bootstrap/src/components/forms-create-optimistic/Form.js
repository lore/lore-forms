import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { Form, FormSection, PropBarrier, Field } from 'lore-react-forms';
import { Connect } from 'lore-hook-connect';
import validators from '../../utils/validators';

export default createReactClass({
  displayName: 'Form',

  getInitialState: function() {
    return {
      key: 0,
      data: {
        userId: null,
        text: ''
      }
    };
  },

  onSubmit: function() {
    const { data } = this.state;

    lore.actions.tweet.create({
      userId: data.userId,
      text: data.text,
      createdAt: moment().unix()
    });

    this.setState({
      key: this.state.key + 1,
      data: this.getInitialState().data
    });
  },

  onChange: function(name, value) {
    const nextData = _.merge({}, this.state.data);
    nextData[name] = value;
    this.setState({
      data: nextData
    });
  },

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },

  render: function() {
    const { key, data } = this.state;
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
                  <Field name="text">
                    {(field) => {
                      const errorText = field.touched && field.error;

                      return (
                        <div className={`form-group ${errorText ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            className="form-control"
                            value={field.value}
                            onChange={(event) => {
                              form.onChange(field.name, event.target.value);
                            }}
                            onFocus={field.onFocus}
                            onBlur={field.onBlur}
                            style={{ width: '100%' }}
                          />
                          {errorText ? (
                            <span className="help-block">
                              {errorText}
                            </span>
                          ) : null}
                        </div>
                      );
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
                            const errorText = field.touched && field.error;

                            return (
                              <div className={`form-group ${errorText ? 'has-error' : ''}`}>
                                <select
                                  className="form-control"
                                  value={field.value || ''}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    field.onBlur();
                                    field.onChange(field.name, value ? Number(value) : value);
                                  }}
                                  style={{ width: '100%' }}
                                >
                                  {[<option key="" value=""/>].concat(connect.options.data.map((option) => {
                                    return (
                                      <option
                                        key={option.id}
                                        value={option.id}
                                      >
                                        {option.data['username']}
                                      </option>
                                    );
                                  }))}
                                </select>
                                {errorText ? (
                                  <span className="help-block">
                                    {errorText}
                                  </span>
                                ) : null}
                              </div>
                            );
                          }}
                        </Connect>
                      );
                    }}
                  </Field>
                </FormSection>
              </FormSection>
            </FormSection>
            <FormSection className="mui-card-actions">
              <PropBarrier>
                <button
                  className="btn btn-primary"
                  disabled={form.hasError}
                  onClick={this.onSubmit}
                >
                  Create
                </button>
              </PropBarrier>
            </FormSection>
          </FormSection>
        )}
      </Form>
    );
  }

});

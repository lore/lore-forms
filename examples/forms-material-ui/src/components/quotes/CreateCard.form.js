import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { RaisedButton } from 'material-ui';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField } from 'lore-react-forms-material-ui';
import validators from '../../utils/validators';

export default createReactClass({
  displayName: 'CreateCard.form',

  propTypes: {
    onSubmit: PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      quote: '',
      author: ''
    }
  },

  onSubmit: function() {
    this.props.onSubmit(this.state);
  },

  onChange: function(name, value) {
    const state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function(data) {
    return {
      author: [validators.isRequired],
      quote: [validators.isRequired]
    }
  },

  render: function() {
    const data = this.state;
    const validators = this.getValidators(data);

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
                    name="quote"
                    props={{
                      floatingLabelText: "Quote",
                      style: { width: '100%' },
                      multiLine: true
                    }}
                  />
                </FormSection>
              </FormSection>
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    name="author"
                    props={{
                      floatingLabelText: "Author",
                      style: { width: '100%' }
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

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { RaisedButton } from 'material-ui';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField } from 'lore-react-forms-material-ui';
import validators from '../../utils/validators';
import TemplateForm from '../_common/TemplateForm';

export default createReactClass({
  displayName: 'CreateCard.template',

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
      <TemplateForm
        data={data}
        validators={validators}
        onChange={this.onChange}
        fieldMap={{
          text: (form, props) => {
            return (
              <FormSection className="row">
                <FormSection className="col-md-12">
                  <TextField
                    {...props}
                  />
                </FormSection>
              </FormSection>
            );
          }
        }}
        actionMap={{
          raised: (form, props) => {
            return (
              <RaisedButton
                {...props}
              />
            )
          }
        }}
        config={{
          fields: [
            {
              type: 'text',
              props: (form) => {
                return {
                  floatingLabelText: "Quote",
                  style: { width: '100%' },
                  name: "quote",
                  multiLine: true
                };
              }
            },
            {
              type: 'text',
              props: (form) => {
                return {
                  floatingLabelText: "Author",
                  style: { width: '100%' },
                  name: "author"
                };
              }
            }
          ],
          actions: [
            {
              type: 'raised',
              props: (form) => {
                return {
                  label: "Save",
                  primary: true,
                  onTouchTap: this.onSubmit
                }
              }
            }
          ]
        }}
      />
    );
  }

});
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { FlatButton } from 'material-ui';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField } from 'lore-react-forms-material-ui';
import validators from '../../utils/validators';
import SchemaForm from '../_common/SchemaForm';

export default createReactClass({
  displayName: 'CreateCard.hook',

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
      <SchemaForm
        data={data}
        validators={validators}
        onChange={this.onChange}
        callbacks={{
          onSubmit: this.onSubmit
        }}
        schema={lore.config.forms.schemas.default}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
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
                  onTouchTap: form.callbacks.onSubmit
                }
              }
            }
          ]
        }}
      />
    );
  }

});

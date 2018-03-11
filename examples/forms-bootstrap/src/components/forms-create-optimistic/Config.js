import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import { SchemaForm } from 'lore-react-forms';
import validators from '../../utils/validators';

export default createReactClass({
  displayName: 'Config',

  getInitialState: function() {
    return {
      key: 0,
      data: {
        userId: null,
        text: ''
      }
    };
  },

  onSubmit: function(data) {
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
      <SchemaForm
        key={key}
        data={data}
        validators={validators}
        onChange={this.onChange}
        schema={lore.config.forms.schemas.default}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        config={{
          fields: {
            text: {
              type: 'text',
              props: (form) => {
                return {
                  label: 'Text',
                  placeholder: 'Typing \'explode\' will cause an error to occur'
                };
              }
            },
            userId: {
              type: 'select',
              props: (form) => {
                return {
                  label: 'User',
                  options: (getState, props) => {
                    return getState('user.find');
                  },
                  optionLabel: 'username'
                };
              }
            }
          },
          actions: [
            {
              type: 'primary',
              props: (form) => {
                return {
                  label: 'Create',
                  disabled: form.hasError,
                  onClick: () => {
                    this.onSubmit(data)
                  }
                }
              }
            }
          ]
        }}
      />
    );
  }

});

import React from 'react';
import createReactClass from 'create-react-class';
import validators from '../../utils/validators';
import { CreateOptimisticBlueprint } from 'lore-hook-forms-bootstrap';

export default createReactClass({
  displayName: 'Blueprint',

  getInitialState: function() {
    return {
      data: {
        text: '',
        userId: null
      }
    }
  },

  render: function() {
    const { data } = this.state;

    return (
      <CreateOptimisticBlueprint
        modelName="tweet"
        data={data}
        schema={lore.config.forms.schemas.default}
        fieldMap={lore.config.forms.fieldMap}
        actionMap={lore.config.forms.actionMap}
        validators={{
          text: [validators.isRequired],
          userId: [validators.number.isRequired]
        }}
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

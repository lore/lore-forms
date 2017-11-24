import React from 'react';
import _ from 'lodash';

export default function(modelName, attributes) {
  return {
    template: 'default',
    props: (form) => {
      return {
        onSubmit: (data) => {
          lore.actions[modelName].destroy(form.model);
        }
      };
    },
    validators: {},
    fields: {
      confirm: {
        type: 'custom',
        props: (form) => {
          return {
            render: () => {
              return (
                <div>
                  Are you sure you want to delete this {_.upperFirst(modelName)}?
                </div>
              );
            }
          }
        }
      }
    },
    actions: [
      {
        type: 'raised',
        props: (form) => {
          return {
            label: "Destroy",
            primary: true,
            disabled: form.hasError,
            onTouchTap: () => {
              form.callbacks.onSubmit(form.data)
            }
          }
        }
      }
    ]
  };
}
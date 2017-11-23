import React from 'react';
import _ from 'lodash';

export default function(modelName, attributes) {
  return {
    template: 'overlay',
    props: (form) => {
      return {
        title: `Destroy ${_.upperFirst(modelName)}`,
        subtitle: `Submit this form to destroy this ${modelName}`,
        successMessage: {
          title: 'Success!',
          message: `${_.upperFirst(modelName)} destroyed.`
        },
        reducer: modelName,
        request: (data) => {
          return lore.actions[modelName].destroy(form.model).payload;
        }
      }
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
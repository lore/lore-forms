import React from 'react';
import _ from 'lodash';

export default function(modelName, attributes) {
  return {
    template: 'wizard',
    steps: [
      {
        form: 'wizard',
        props: (form) => {
          return {
            title: `Destroy ${_.upperFirst(modelName)}`,
            subtitle: `Submit this form to destroy this ${modelName}`,
            stepper: {
              stepIndex: 0,
              steps: [
                'Confirm',
                'Submit'
              ]
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
                  form.callbacks.onNext(form.data)
                }
              }
            }
          }
        ]
      },
      {
        form: 'wizardRequest',
        props: (form) => {
          return {
            title: `Destroy ${_.upperFirst(modelName)}`,
            subtitle: `Submit this form to destroy this ${modelName}`,
            stepper: {
              stepIndex: 1,
              steps: [
                'Confirm',
                'Submit'
              ]
            },
            request: (data) => {
              return lore.actions[modelName].destroy(form.model).payload;
            },
            reducer: modelName,
            onSuccess: form.callbacks.onRequestSuccess,
            onError: form.callbacks.onRequestError
          }
        }
      },
      {
        form: 'wizard',
        props: (form) => {
          return {
            title: `Destroy ${_.upperFirst(modelName)}`,
            subtitle: `Submit this form to destroy this ${modelName}`,
            stepper: {
              stepIndex: 2,
              steps: [
                'Confirm',
                'Submit'
              ]
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
                      {_.upperFirst(modelName)} destroyed!
                    </div>
                  );
                }
              }
            }
          }
        },
        actions: []
      }
    ]
  };
}
import React from 'react';
import _ from 'lodash';
import fields from './partials/fields';
import validators from './partials/validators';

export default function(modelName, attributes) {
  return {
    template: 'wizard',
    steps: [
      {
        form: 'wizard',
        props: (form) => {
          return {
            title: `Update ${_.upperFirst(modelName)}`,
            subtitle: `Fill out the form to update the ${modelName}`,
            stepper: {
              stepIndex: 0,
              steps: [
                'Data',
                'Submit'
              ]
            }
          }
        },
        validators: validators(attributes),
        fields: fields(attributes),
        actions: [
          {
            type: 'raised',
            props: (form) => {
              return {
                label: "Update",
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
            title: `Update ${_.upperFirst(modelName)}`,
            subtitle: `Fill out the form to update the ${modelName}`,
            stepper: {
              stepIndex: 1,
              steps: [
                'Data',
                'Submit'
              ]
            },
            request: (data) => {
              return lore.actions[modelName].update(form.model, data).payload;
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
            title: `Update ${_.upperFirst(modelName)}`,
            subtitle: `Fill out the form to update the ${modelName}`,
            stepper: {
              stepIndex: 2,
              steps: [
                'Data',
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
                      {_.upperFirst(modelName)} updated!
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
                label: "Update Again",
                primary: true,
                disabled: form.hasError,
                onTouchTap: () => {
                  form.callbacks.onResetWizard()
                }
              }
            }
          }
        ]
      }
    ]
  };
}
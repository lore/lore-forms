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
            title: `Update ${_.capitalize(modelName)}`,
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
        form: 'request',
        props: (form) => {
          return {
            request: (data) => {
              return lore.actions[modelName].update(form.model, data).payload;
            },
            reducer: modelName,
            onSuccess: form.callbacks.onResetWizard,
            onError: form.callbacks.onRequestError
          }
        }
      }
    ]
  };
}
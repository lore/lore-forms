import _ from 'lodash';
import fields from './partials/fields';
import validators from './partials/validators';

export default function(modelName, attributes) {
  return {
    template: 'wizard',
    steps: [
      {
        form: 'wizard',
        props: {
          title: `Create ${_.capitalize(modelName)}`,
          subtitle: `Fill out the form to create a ${modelName}`,
          stepper: {
            stepIndex: 0,
            steps: [
              'Enter Data',
              'Make Request'
            ]
          }
        },
        validators: validators(attributes),
        fields: fields(attributes),
        actions: [
          {
            type: 'raised',
            props: (form) => {
              return {
                label: "Create",
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
              return lore.actions[modelName].create(data).payload;
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
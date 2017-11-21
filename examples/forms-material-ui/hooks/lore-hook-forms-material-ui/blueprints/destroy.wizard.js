import _ from 'lodash';

export default function(modelName, attributes) {
  return {
    template: 'wizard',
    steps: [
      {
        form: 'wizard',
        props: (form) => {
          return {
            title: `Destroy ${_.capitalize(modelName)}`,
            subtitle: `Submit this form to destroy this ${modelName}`,
            stepper: {
              stepIndex: 0,
              steps: [
                'Submit Form'
              ]
            }
          }
        },
        validators: {},
        fields: {},
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
        form: 'request',
        props: (form) => {
          return {
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
        form: 'custom',
        props: {
          render: (form) => {
            return (
              <div>
                {_.capitalize(modelName)} destroyed!
              </div>
            );
          }
        }
      }
    ]
  };
}
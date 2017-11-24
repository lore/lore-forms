import fields from './partials/fields';
import validators from './partials/validators';

export default function(modelName, attributes) {
  return {
    template: 'default',
    props: {
      onSubmit: (data) => {
        lore.actions[modelName].create(data);
      }
    },
    validators: validators(attributes),
    fields: fields(attributes),
    actions: [
      {
        type: 'flat',
        props: (form) => {
          return {
            label: 'Cancel',
            onTouchTap: () => {
              form.callbacks.onCancel()
            }
          }
        }
      },
      {
        type: 'raised',
        props: (form) => {
          return {
            label: 'Create',
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
};

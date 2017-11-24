import fields from './partials/fields';
import validators from './partials/validators';

export default function(modelName, attributes) {
  return {
    template: 'default',
    props: (form) => {
      return {
        onSubmit: (data) => {
          lore.actions[modelName].update(form.model, data);
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
              form.callbacks.onSubmit(form.data)
            }
          }
        }
      }
    ]
  };
};

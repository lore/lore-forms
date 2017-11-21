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
              form.callbacks.onSubmit(form.data)
            }
          }
        }
      }
    ]
  };
}
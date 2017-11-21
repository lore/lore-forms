import _ from 'lodash';

export default function(modelName, attributes) {
  return {
    template: 'overlay',
    props: (form) => {
      return {
        title: `Destroy ${_.capitalize(modelName)}`,
        subtitle: `Submit this form to destroy this ${modelName}`,
        reducer: modelName,
        request: (data) => {
          return lore.actions[modelName].destroy(form.model).payload;
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
              form.callbacks.onSubmit(form.data)
            }
          }
        }
      }
    ]
  };
}
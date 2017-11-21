import _ from 'lodash';
import fields from './partials/fields';
import validators from './partials/validators';

export default function(modelName, attributes) {
  return {
    template: 'overlay',
    props: (form) => {
      return {
        title: `Update ${_.capitalize(modelName)}`,
        subtitle: `Fill out the form to update the ${modelName}`,
        reducer: modelName,
        request: (data) => {
          return lore.actions[modelName].update(form.model, data).payload;
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
}

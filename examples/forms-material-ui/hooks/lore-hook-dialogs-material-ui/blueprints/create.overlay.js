import _ from 'lodash';
import fields from './partials/fields';
import validators from './partials/validators';

export default function(modelName, attributes) {
  return {
    template: 'overlay',
    props: {
      title: `Create ${_.upperFirst(modelName)}`,
      subtitle: `Fill out the form to create a ${modelName}`,
      successMessage: {
        title: 'Success!',
        message: `${_.upperFirst(modelName)} created.`
      },
      reducer: modelName,
      request: (data) => {
        return lore.actions[modelName].create(data).payload;
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
            label: "Create",
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

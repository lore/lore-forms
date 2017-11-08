import validators from '../../utils/validators';

export default {
  template: {
    title: 'Create Tweet',
    subtitle: 'Enter text and select the user to tweet it'
  },
  validators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },
  fields: [
    {
      type: 'text',
      props: (form) => {
        return {
          floatingLabelText: "Text",
          style: { width: '100%' },
          name: "text",
          multiLine: true
        };
      }
    },
    {
      type: 'autocomplete',
      props: (form) => {
        return {
          floatingLabelText: "User",
          name: "userId",
          getOptions: this.getOptions,
          field: "username"
        };
      }
    }
  ],
  actions: [
    {
      type: 'submit',
      props: (form) => {
        return {
          label: "Save",
          primary: true,
          onTouchTap: form.callbacks.onSubmit
        }
      }
    }
  ]
};

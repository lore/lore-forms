import validators from '../../utils/validators';

export default {
  template: {
    type: 'default',
    props: () => {
      return {
        title: 'Create Tweet',
        subtitle: 'Enter text and select the user to tweet it'
      }
    }
  },
  validators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },
  fields: {
    text: {
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
    userId: {
      type: 'autocomplete',
      props: (form) => {
        return {
          floatingLabelText: "User",
          name: "userId",
          getOptions: (getState, props) => {
            return {
              options: getState('user.find')
            }
          },
          field: "username"
        };
      }
    }
  },
  actions: [
    {
      type: 'raised',
      props: (form) => {
        return {
          label: "Save",
          primary: true,
          onTouchTap: form.callbacks.onSubmit.bind(null, form.data)
        }
      }
    }
  ]
};

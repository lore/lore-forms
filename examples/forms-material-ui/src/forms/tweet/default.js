import validators from '../../utils/validators';
import moment from 'moment';

export default {
  templateName: 'form',
  template: {
    type: 'default',
    props: (form) => {
      return {
        title: 'Create Tweet',
        subtitle: 'Enter text and select the user to tweet it',
        onSubmit: (data) => {
          lore.actions.tweet.create({
            userId: data.userId,
            text: data.text,
            createdAt: moment().unix()
          })
        }
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
          hintText: 'Typing \'explode\' will cause an error to occur',
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
          disabled: form.hasError,
          onTouchTap: form.callbacks.onSubmit.bind(null, form.data)
        }
      }
    }
  ]
};

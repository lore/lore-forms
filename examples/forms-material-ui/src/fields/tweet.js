import validators from '../utils/validators';

export default {
  data: {
    text: '',
    userId: null
  },
  validators: {
    text: [validators.isRequired],
    userId: [validators.number.isRequired]
  },
  fields: [
    {
      key: 'text',
      type: 'text',
      props: (form) => {
        return {
          floatingLabelText: 'Text',
          hintText: `Typing 'explode' will cause an error to occur`
        };
      }
    },
    {
      key: 'userId',
      type: 'select',
      props: (form) => {
        return {
          floatingLabelText: 'User',
          options: (getState, props) => {
            return getState('user.find');
          },
          optionLabel: 'username'
        };
      }
    }
  ]
};

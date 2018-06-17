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
          label: 'Text',
          placeholder: `Typing 'explode' will cause an error to occur`,
          name: 'text'
        };
      }
    },
    {
      key: 'userId',
      type: 'select',
      props: (form) => {
        return {
          label: 'User',
          name: 'userId',
          options: (getState, props) => {
            return getState('user.find');
          },
          optionLabel: 'username'
        };
      }
    }
  ]
};

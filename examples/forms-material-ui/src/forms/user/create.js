import validators from '../../utils/validators';
import moment from 'moment';

export default {
  templateName: 'default',
  props: (form) => {
    return {
      onSubmit: (data) => {
        lore.actions.user.create(data)
      }
    }
  },
  initialState: {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    country: null,
    region: null,
    agreeToTerms: false
  },
  validators: function(data) {
    const {
      username,
      password
    } = data;

    const usernameModel = data.username ? lore.getState('user.first', {
      where: {
        username: username
      }
    }) : null;

    return {
      name: [validators.isRequired],
      username: [
        validators.isRequired,
        validators.isUsername,
        validators.usernameIsAvailable(usernameModel)
      ],
      password: [
        validators.isRequired,
        validators.isPassword
      ],
      confirmPassword: [
        validators.isRequired,
        validators.isPassword,
        validators.matchesPassword(password)
      ],
      country: [validators.number.isRequired],
      region: [validators.number.isRequired]
    }
  },
  fields: {
    name: {
      type: 'text',
      props: {
        floatingLabelText: "Name",
        style: { width: '100%' },
        autoComplete: 'off'
      }
    },
    username: {
      type: 'username',
      props: {
        floatingLabelText: 'Username  *',
        style: { width: '100%' }
      }
    },
    password: {
      type: 'password',
      props: {
        floatingLabelText: "Password",
        style: { width: '100%' }
      }
    },
    confirmPassword: {
      type: 'password',
      props: {
        floatingLabelText: "Confirm Password",
        style: { width: '100%' }
      }
    },
    country: {
      type: 'select',
      props: {
        floatingLabelText: "Country *",
        style: { width: '100%' },
        field: 'name',
        getOptions: (getState, props) => {
          return {
            options: getState('country.find')
          }
        }
      }
    },
    region: {
      type: 'select',
      props: (form) => {
        return {
          floatingLabelText: "Region *",
          disabled: !form.data.country,
          style: { width: '100%' },
          field: 'name',
          getOptions: (getState, props) => {
            const { country } = props.data;

            if (country) {
              return {
                options: getState('region.find', {
                  where: {
                    countryId: country
                  }
                })
              }
            }

            return {
              options: {
                data: []
              }
            }
          }
        }
      }
    },
    agreeToTerms: {
      type: 'checkbox',
      props: {
        label: "Agree to Terms of Use *",
        style: { width: '100%', paddingTop: '24px' }
      }
    },
  },
  actions: [
    {
      type: 'raised',
      props: (form) => {
        return {
          label: "Save",
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

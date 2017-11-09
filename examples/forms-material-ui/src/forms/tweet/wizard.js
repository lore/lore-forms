import validators from '../../utils/validators';

export default {
  templateName: 'wizard',
  steps: [
    {
      template: {
        type: 'wizard',
        props: () => {
          return {
            title: 'Create Tweet',
            subtitle: 'Enter text and select the user to tweet it',
            stepper: {
              label: 'Enter Text'
            }
          };
        }
      },
      validators: function(data) {
        return {
          text: [validators.isRequired]
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
        }
      },
      actions: [
        {
          type: 'raised',
          props: (form) => {
            return {
              label: "Next",
              primary: true,
              disabled: form.hasError,
              onTouchTap: () => {
                form.callbacks.onNext(form.data)
              }
            }
          }
        }
      ]
    },
    {
      template: {
        type: 'wizard',
        props: () => {
          return {
            title: 'Create Tweet',
            subtitle: 'Enter text and select the user to tweet it',
            stepper: {
              label: 'Select User'
            }
          };
        }
      },
      validators: function(data) {
        return {
          userId: [validators.number.isRequired]
        }
      },
      fields: {
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
          type: 'flat',
          props: (form) => {
            return {
              label: "Back",
              primary: false,
              onTouchTap: () => {
                form.callbacks.onPrevious(form.data)
              }
            }
          }
        },
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
    },
    {
      // template: {
      //   type: 'request'
      // },
      template: {
        type: 'custom',
        props: () => {
          return {
            // title: 'Create Tweet',
            // subtitle: 'Enter text and select the user to tweet it',
            stepper: {
              label: 'Request'
            }
          };
        }
      },
      render: (form) => {
        return (
          <h1>Success!</h1>
        )
      },
      props: (form) => {
        return {
          request: form.props.request,
          reducer: 'tweet',
          onSuccess: form.callbacks.onRequestSuccess,
          onError: form.callbacks.onRequestError
        }
      },
      fields: {},
      actions: []
    },
    {
      template: {
        type: 'custom',
        props: () => {
          return {
            // title: 'Create Tweet',
            // subtitle: 'Enter text and select the user to tweet it',
            stepper: {
              label: 'Confirmation'
            }
          };
        }
      },
      render: (form) => {
        return (
          <h1>Success!</h1>
        )
      },
      fields: {},
      actions: []
    }
  ]
};

import validators from '../../utils/validators';

const Steps = {
  STEP_1: 0,
  STEP_2: 1,
  CONFIRMATION: 2
};

export default {
  blueprint: 'wizard',
  data: {},
  steps: [
    {
      form: 'step',
      steps: [
        '1. Enter Text',
        '2. Select User'
      ],
      activeStep: 0,
      validators: {
        text: [validators.isRequired]
      },
      fields: [
        {
          key: 'text',
          type: 'text',
          props: (form) => {
            return {
              label: 'Text',
              placeholder: 'Typing \'explode\' will cause an error to occur'
            };
          }
        }
      ],
      actions: [
        {
          type: 'primary',
          props: (form) => {
            return {
              label: 'Next',
              disabled: form.hasError,
              onClick: () => {
                form.callbacks.onNext(form.data, Steps.STEP_2)
              }
            }
          }
        }
      ]
    },
    {
      form: 'step',
      steps: [
        '1. Enter Text',
        '2. Select User'
      ],
      activeStep: 1,
      validators: {
        userId: [validators.number.isRequired]
      },
      fields: [
        {
          key: 'userId',
          type: 'select',
          props: (form) => {
            return {
              label: 'User',
              options: (getState, props) => {
                return getState('user.find');
              },
              optionLabel: 'username'
            };
          }
        }
      ],
      actions: [
        {
          type: 'default',
          props: (form) => {
            return {
              label: 'Back',
              onClick: () => {
                form.callbacks.onPrevious(form.data)
              }
            }
          }
        },
        {
          type: 'primary',
          props: (form) => {
            return {
              label: 'Update',
              disabled: form.hasError,
              onClick: () => {
                form.callbacks.onSubmit(form.data)
              }
            }
          }
        }
      ]
    },
    {
      form: 'confirmation',
      title: 'Update Tweet',
      successMessage: 'Tweet updated.'
    }
  ]
}

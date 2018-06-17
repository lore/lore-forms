import validators from '../../utils/validators';

const Steps = {
  STEP_1: 0,
  STEP_2: 1,
  CONFIRMATION: 2
};

export default {
  blueprint: 'wizard',
  steps: [
    {
      form: 'step',
      steps: [
        'Enter Text',
        'Select User'
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
              floatingLabelText: 'Text',
              hintText: 'Typing \'explode\' will cause an error to occur'
            };
          }
        }
      ],
      actions: [
        {
          type: 'flat',
          props: (form) => {
            return {
              label: 'Cancel',
              onClick: () => {
                form.callbacks.onCancel()
              }
            }
          }
        },
        {
          type: 'raised',
          props: (form) => {
            return {
              label: 'Next',
              primary: true,
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
        'Enter Text',
        'Select User'
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
              floatingLabelText: 'User',
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
          type: 'flat',
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
          type: 'raised',
          props: (form) => {
            return {
              label: 'Create',
              primary: true,
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
      form: 'confirmation'
    }
  ]
}

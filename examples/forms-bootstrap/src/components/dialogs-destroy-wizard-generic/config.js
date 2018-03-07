import React from 'react';

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
        '1. Confirm Delete',
        '2. Custom Step',
        '3. Confirmation'
      ],
      activeStep: Steps.STEP_1,
      validators: {},
      fields: {
        question: {
          type: 'custom',
          props: {
            render: (form) => {
              return (
                <p>
                  Are you sure you want to delete this?
                </p>
              );
            }
          }
        }
      },
      actions: [
        {
          type: 'primary',
          props: (form) => {
            return {
              label: 'Next',
              onClick: () => {
                form.callbacks.onNext(form.data)
              }
            }
          }
        }
      ]
    },
    {
      form: 'step',
      steps: [
        '1. Confirm Delete',
        '2. Custom Step',
        '3. Confirmation'
      ],
      activeStep: Steps.STEP_2,
      validators: {},
      fields: {
        customExample: {
          type: 'custom',
          props: (form) => {
            return {
              render: () => {
                return (
                  <div>
                    <p>
                      Here is the data for the model you will be deleting:
                    </p>
                    <p>
                      {JSON.stringify(form.data, null, 2)}
                    </p>
                  </div>
                );
              }
            };
          }
        }
      },
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
              label: 'Delete',
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
      title: 'Delete Tweet',
      successMessage: 'Tweet deleted.'
    }
  ]
}

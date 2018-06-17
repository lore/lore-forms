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
        'Confirm Delete',
        'Custom Step',
        'Confirmation'
      ],
      activeStep: Steps.STEP_1,
      validators: {},
      fields: [
        {
          key: 'question',
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
      ],
      actions: [
        {
          type: 'raised',
          props: (form) => {
            return {
              label: 'Next',
              primary: true,
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
        'Confirm Delete',
        'Custom Step',
        'Confirmation'
      ],
      activeStep: Steps.STEP_2,
      validators: {},
      fields: [
        { 
          key: 'customExample',
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
              label: 'Delete',
              primary: true,
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

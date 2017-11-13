import React from 'react';
import validators from '../../utils/validators';
import moment from 'moment';

export default {
  templateName: 'wizardDynamic',
  steps: [
    {
      template: {
        type: 'wizard',
        props: (templateProps) => {
          return {
            title: 'Create Tweet',
            subtitle: 'Enter text and select the user to tweet it',
            stepper: {
              stepIndex: templateProps.stepIndex,
              steps: [
                'Enter Text',
                'Select User',
              ]
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
        props: (templateProps) => {
          return {
            title: 'Create Tweet',
            subtitle: 'Enter text and select the user to tweet it',
            stepper: {
              stepIndex: templateProps.stepIndex,
              steps: [
                'Enter Text',
                'Select User',
              ]
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
      template: {
        type: 'request',
        props: (form) => {
          return {
            // request: form.props.request,
            request: (form) => {
              return lore.actions.tweet.create({
                userId: form.data.userId,
                text: form.data.text,
                createdAt: moment().unix()
              }).payload;
            },
            reducer: 'tweet',
            onSuccess: form.callbacks.onRequestSuccess,
            onError: form.callbacks.onRequestError
          }
        },

      }
    },
    {
      template: {
        type: 'custom'
      },
      render: (form) => {
        return (
          <h1>Success!</h1>
        )
      }
    }
  ]
};

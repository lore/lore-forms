import React from 'react';
import validators from '../../utils/validators';
import moment from 'moment';
import { Card, RaisedButton } from 'material-ui';

export default {
  template: 'wizard',
  steps: [
    {
      form: 'wizard',
      props: (templateProps) => {
        return {
          title: 'Create Tweet',
          subtitle: 'Enter text and select the user to tweet it',
          stepper: {
            stepIndex: 0,
            steps: [
              'Enter Text',
              'Select User',
            ]
          }
        };
      },
      validators: function(data) {
        return {
          text: [validators.isRequired]
        }
      },
      fields: {
        text: {
          type: 'text2',
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
      form: 'wizard',
      props: (templateProps) => {
        return {
          title: 'Create Tweet',
          subtitle: 'Enter text and select the user to tweet it',
          stepper: {
            stepIndex: 1,
            steps: [
              'Enter Text',
              'Select User',
            ]
          }
        };
      },
      validators: function(data) {
        return {
          userId: [validators.number.isRequired]
        }
      },
      fields: {
        userId: {
          type: 'select2',
          props: (form) => {
            return {
              floatingLabelText: "User",
              name: "userId",
              // getOptions: (getState, props) => {
              //   return {
              //     options: getState('user.find')
              //   }
              // },
              options: (getState, props) => {
                return getState('user.find');
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
                form.callbacks.onNext(form.data)
              }
            }
          }
        }
      ]
    },
    {
      form: 'wizardRequest',
      props: (form) => {
        return {
          title: 'Create Tweet',
          subtitle: 'Enter text and select the user to tweet it',
          stepper: {
            stepIndex: 1,
            steps: [
              'Enter Text',
              'Select User',
            ]
          },
          request: (data) => {
            return lore.actions.tweet.create({
              userId: data.userId,
              text: data.text,
              createdAt: moment().unix()
            }).payload;
          },
          reducer: 'tweet',
          onSuccess: form.callbacks.onRequestSuccess,
          onError: form.callbacks.onRequestError,

        }
      }
    },
    {
      form: 'custom',
      props: () => {
        return {
          render: (form) => {
            return (
              <Card style={{ paddingTop: '16px', paddingBottom: '24px'}}>
                <div className="mui-card-text">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-center">
                        <h2 style={{ padding: 0, margin: 0 }}>
                          Tweet posted!
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mui-card-actions">
                  <div className="text-center">
                    <RaisedButton
                      label="Create Another"
                      primary={true}
                      onTouchTap={form.callbacks.onResetWizard}
                    />
                  </div>
                </div>
              </Card>
            );
          }
        }
      }
    }
  ]
};

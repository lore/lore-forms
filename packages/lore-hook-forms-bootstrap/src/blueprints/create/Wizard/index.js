import React from 'react';
import createReactClass from 'create-react-class';
import Wizard from './Wizard';

export default createReactClass({
  render: function() {
    const {
      schema,
      fieldMap,
      actionMap,
      steps,
      data,
      validators,
      fields,
      actions,
      ...other
    } = this.props;

    return (
      <Wizard
        schema={schema}
        fieldMap={fieldMap}
        actionMap={actionMap}
        data={data}
        validators={validators}
        steps={steps || [
          {
            form: 'step',
            // steps: [
            //   'Enter Data'
            // ],
            // activeStep: 0,
            validators: validators || {},
            fields: fields || {
              question: {
                type: 'custom',
                props: {
                  render: (form) => {
                    return (
                      <p>
                        No fields have been provided.
                      </p>
                    );
                  }
                }
              },
            },
            actions: actions || [
              {
                type: 'primary',
                props: (form) => {
                  return {
                    label: 'Create',
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
        ]}
        {...other}
      />
    );
  }
});

import React from 'react';
import createReactClass from 'create-react-class';
import Wizard from './Wizard';

export default createReactClass({
  render: function() {
    const { modelName } = this.props;
    const {
      model,
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
        modelName={modelName}
        model={model}
        schema={schema}
        fieldMap={fieldMap}
        actionMap={actionMap}
        data={data}
        steps={steps || [
          {
            form: 'step',
            // steps: [
            //   'Enter Data'
            // ],
            // activeStep: 0,
            validators: validators || {},
            fields: fields || [
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
            actions: actions || [
              {
                type: 'raised',
                props: (form) => {
                  return {
                    label: 'Delete',
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
        ]}
        {...other}
      />
    );
  }
});

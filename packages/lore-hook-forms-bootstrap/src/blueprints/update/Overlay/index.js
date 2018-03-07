import React from 'react';
import createReactClass from 'create-react-class';
import Overlay from './Overlay';

export default createReactClass({
  render: function() {
    const { modelName } = this.props;
    const {
      model,
      schema,
      fieldMap,
      actionMap,
      data,
      validators,
      fields,
      actions,
      ...other
    } = this.props;

    return (
      <Overlay
        modelName={modelName}
        model={model}
        schema={schema}
        fieldMap={fieldMap}
        actionMap={actionMap}
        data={data}
        validators={validators}
        fields={fields || {
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
        }}
        actions={actions || [
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
        ]}
        {...other}
      />
    );
  }
});

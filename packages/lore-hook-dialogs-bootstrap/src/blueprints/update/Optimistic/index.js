import React from 'react';
import createReactClass from 'create-react-class';
import Optimistic from './Optimistic';

export default createReactClass({
  render: function() {
    const { modelName } = this.props;
    const {
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
      <Optimistic
        modelName={modelName}
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
                    No fields have not provided.
                  </p>
                );
              }
            }
          },
        }}
        actions={actions || [
          {
            type: 'default',
            props: (form) => {
              return {
                label: 'Cancel',
                onClick: () => {
                  form.callbacks.onCancel(form.data)
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
        ]}
        {...other}
      />
    );
  }
});

import React from 'react';
import createReactClass from 'create-react-class';
import Overlay from './Overlay';

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
      <Overlay
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
                    Are you sure you want to delete this?
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
                label: 'Delete',
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

import React from 'react';
import createReactClass from 'create-react-class';
import Optimistic from './Optimistic';

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
      <Optimistic
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
                    Are you sure you want to delete this?
                  </p>
                );
              }
            }
          },
        }}
        actions={actions || [
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
        ]}
        {...other}
      />
    );
  }
});

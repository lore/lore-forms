import React from 'react';
import createReactClass from 'create-react-class';
import Overlay from './Overlay';

export default createReactClass({
  render: function() {
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
        schema={schema}
        fieldMap={fieldMap}
        actionMap={actionMap}
        data={data}
        validators={validators}
        fields={fields || [
          {
            key: 'question',
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
          }
        ]}
        actions={actions || [
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
        ]}
        {...other}
      />
    );
  }
});

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';

export default createReactClass({
  displayName: 'SchemaForm',

  propTypes: {
    data: PropTypes.object.isRequired,
    validators: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    callbacks: PropTypes.object,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  render: function() {
    const {
      data,
      validators,
      onChange,
      callbacks,
      schema,
      fieldMap,
      actionMap,
      config: {
        fields,
        actions
      }
    } = this.props;

    return (
      <Form
        data={data}
        validators={validators}
        onChange={onChange}
        callbacks={callbacks}>
        {(form) => (
          <FormSection>
            {schema.fields(form)(
              fields.map((field, index) => {
                const mappedField = fieldMap[field.type];
                return (
                  React.cloneElement(schema.field(form)(
                    mappedField(form, field.props(form))
                  ), {
                    key: index
                  })
                );
              })
            )}
            {schema.actions(form)(
              actions.map((action, index) => {
                const mappedAction = actionMap[action.type];
                return (
                  React.cloneElement(schema.action(form)(
                    mappedAction(form, action.props(form))
                  ), {
                    key: index
                  })
                );
              })
            )}
          </FormSection>
        )}
      </Form>
    );
  }

});

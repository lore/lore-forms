import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';

export default createReactClass({
  displayName: 'TemplateForm',

  propTypes: {
    data: PropTypes.object.isRequired,
    validators: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  },

  render: function() {
    const {
      data,
      validators,
      onChange,
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
        onChange={onChange}>
        {(form) => {
          return (
            <FormSection>
              <FormSection className="mui-card-text">
                {fields.map(function(field, index) {
                  const mappedField = fieldMap[field.type];
                  return React.cloneElement(mappedField(form, field.props(form)), {
                    key: index
                  });
                })}
              </FormSection>
              <FormSection className="mui-card-actions">
                <PropBarrier>
                  {actions.map(function(action, index) {
                    const mappedAction = actionMap[action.type];
                    return React.cloneElement(mappedAction(form, action.props(form)), {
                      key: index
                    });
                  })}
                </PropBarrier>
              </FormSection>
            </FormSection>
          );
        }}
      </Form>
    );
  }

});

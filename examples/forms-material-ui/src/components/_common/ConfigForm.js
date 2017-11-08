import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Form, FormSection, PropBarrier } from 'lore-react-forms';

export default createReactClass({
  displayName: 'ConfigForm',

  propTypes: {
    data: PropTypes.object.isRequired,
    validators: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
  },

  render: function() {
    const {
      data,
      validators,
      onChange,
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
                  return React.cloneElement(field.render(form), {
                    key: index
                  });
                })}
              </FormSection>
              <FormSection className="mui-card-actions">
                <PropBarrier>
                  {actions.map(function(action, index) {
                    return React.cloneElement(action.render(form), {
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

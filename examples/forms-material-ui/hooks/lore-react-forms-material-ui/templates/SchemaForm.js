import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'TemplateForm',

  propTypes: {
    schema: PropTypes.object,
    fields: PropTypes.object,
    config: PropTypes.object.isRequired
  },

  childContextTypes: {
    schema: PropTypes.object,
    fields: PropTypes.object
  },

  getSchema: function() {
    const { schema } = this.props;
    return schema;
    // const { templates } = lore.config.forms;
    // const templateName = config.template || 'default';
    // return templates[templateName];
    return schema || lore.config.forms.schemas.default;
  },

  getFields: function() {
    // const { fields } = lore.config.forms;
    // return fields;
    const { fields } = this.props;
    return fields;
    return fields || lore.config.forms.fields;
  },

  getChildContext: function() {
    return {
      schema: this.getSchema(),
      fields: this.getFields()
    };
  },

  render: function() {
    const schema = this.getSchema();
    const { FormSteps } = schema;
    const {
      config: {
        stepIndex,
        steps,
        ...other
      }
    } = this.props;

    return (
      <FormSteps
        stepIndex={stepIndex}
        steps={steps}
        {...other}
      />
    );
  }

});

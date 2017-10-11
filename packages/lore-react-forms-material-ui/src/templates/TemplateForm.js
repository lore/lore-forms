import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'TemplateForm',

  childContextTypes: {
    template: PropTypes.object,
    fields: PropTypes.object
  },

  getTemplate: function() {
    const { config } = this.props;
    const { templates } = lore.config.forms;
    const templateName = config.template || 'defaultNew';
    return templates[templateName];
  },

  getFields: function() {
    const { fields } = lore.config.forms;
    return fields;
  },

  getChildContext: function() {
    return {
      template: this.getTemplate(),
      fields: this.getFields()
    };
  },

  render: function() {
    const template = this.getTemplate();
    const { FormSteps } = template;

    return (
      <FormSteps {...this.props} />
    );
  }

});

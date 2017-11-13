import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import WizardDynamicSchemaTemplate from './WizardDynamicSchemaTemplate';
import SchemaTemplate from './SchemaTemplate';

export default createReactClass({
  displayName: 'SwitchableWizardDynamicSchemaTemplate',

  propTypes: {
    config: PropTypes.object.isRequired,
  },

  render: function() {
    const {
      config
    } = this.props;

    if (config.steps) {
      return (
        <WizardDynamicSchemaTemplate {...this.props} />
      );
    }

    return (
      <SchemaTemplate {...this.props} />
    );
  }

});

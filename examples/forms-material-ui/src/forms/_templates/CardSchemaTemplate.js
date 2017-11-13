import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Card, CardTitle } from 'material-ui';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/templates/SchemaTemplate';

export default createReactClass({
  displayName: 'CardSchemaTemplate',

  propTypes: {
    config: PropTypes.object.isRequired,
    alert: PropTypes.node
  },

  render: function() {
    const {
      config,
      alert,
      ...other
    } = this.props;

    const templateProps = config.template.props();

    return (
      <Card className="form-card">
        <CardTitle
          title={templateProps.title}
          subtitle={templateProps.subtitle}
        />
        {alert}
        <SchemaForm
          config={config}
          {...other}
        />
      </Card>
    );
  }

});

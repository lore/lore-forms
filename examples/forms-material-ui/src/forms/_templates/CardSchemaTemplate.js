import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Card, CardTitle } from 'material-ui';
import SchemaForm from '../../../hooks/lore-hook-forms-material-ui/SchemaForm';

export default createReactClass({
  displayName: 'CardSchemaTemplate',

  propTypes: {
    config: PropTypes.object.isRequired,
  },

  render: function() {
    const {
      config: {
        template
      }
    } = this.props;

    const templateProps = template.props();

    return (
      <Card className="form-card">
        <CardTitle
          title={templateProps.title}
          subtitle={templateProps.subtitle}
        />
        <SchemaForm {...this.props} />
      </Card>
    );
  }

});

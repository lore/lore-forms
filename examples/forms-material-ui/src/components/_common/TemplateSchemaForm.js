import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Card, CardTitle } from 'material-ui';
import SchemaForm from './SchemaForm';

export default createReactClass({
  displayName: 'TemplateSchemaForm',

  propTypes: {
    data: PropTypes.object.isRequired,
    validators: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    callbacks: PropTypes.object,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
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
        template: {
          title,
          subtitle
        },
        ...formConfig
      }
    } = this.props;

    return (
      <Card className="form-card">
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <SchemaForm
          data={data}
          validators={validators}
          onChange={onChange}
          callbacks={callbacks}
          schema={schema}
          fieldMap={fieldMap}
          actionMap={actionMap}
          config={formConfig}
        />
      </Card>
    );
  }

});

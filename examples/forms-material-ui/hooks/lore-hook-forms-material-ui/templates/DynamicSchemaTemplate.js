import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'DynamicSchemaTemplate',

  propTypes: {
    data: PropTypes.object,
    validators: PropTypes.object,
    onChange: PropTypes.func,
    callbacks: PropTypes.object,
    schema: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    actionMap: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  },

  render: function() {
    const {
      // data,
      // validators,
      // onChange,
      schema,
      formMap,
      fieldMap,
      actionMap,
      config,
      callbacks,
      ...other
    } = this.props;

    return formMap[config.template.type](
      schema,
      formMap,
      fieldMap,
      actionMap,
      callbacks,
      config,
      other, // props
      // stepIndex || 0
    );
  }

});

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
// import Form from './Form';

/**
 * Fields:
 *
 * name
 * type
 * data
 * validators
 * onChange
 * fields
 * actions
 *
 */

export default createReactClass({
  displayName: 'FormStep',

  contextTypes: {
    template: PropTypes.object
  },

  render: function() {
    const {
      Form
    } = this.context.template;

    return (
      <Form {...this.props} />
    );
  }

});

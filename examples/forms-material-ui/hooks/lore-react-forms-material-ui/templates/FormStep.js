import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

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
    schema: PropTypes.object
  },

  propTypes: {
    type: PropTypes.string.isRequired
  },

  render: function() {
    const {
      Form,
      Request
    } = this.context.schema;

    const {
      type,
      ...other
    } = this.props;

    if (type === 'form') {
      return (
        <Form {...this.props} />
      );
    }

    if (type === 'request') {
      return (
        <Request {...this.props.props} />
      );
    }

    if (type === 'custom') {
      return this.props.render(this.props);
    }

    return (
      <div>Unknown form type: {type}</div>
    );

  }

});

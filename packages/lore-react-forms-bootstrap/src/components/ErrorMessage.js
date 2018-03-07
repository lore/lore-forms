import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
  displayName: 'Error',

  propTypes: {
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  },

  render: function () {
    const {error} = this.props;
    let text = '';

    if (_.isPlainObject(error)) {
      text = JSON.stringify(error);
    } else if (_.isArray(error)) {
      text = JSON.stringify(error);
    } else {
      text = error;
    }

    return (
      <div className="alert alert-danger">
        <strong>Error!</strong> {text}
      </div>
    );
  }

});

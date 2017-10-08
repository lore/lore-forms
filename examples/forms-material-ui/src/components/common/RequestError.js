import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Error from './Error';
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
  displayName: 'Error',

  propTypes: {
    request: PropTypes.object
  },

  render: function() {
    var request = this.props.request;

    if (request && request.state === PayloadStates.ERROR_CREATING) {
      return (
        <Error error={request.error}/>
      );
    }

    return null;
  }

});

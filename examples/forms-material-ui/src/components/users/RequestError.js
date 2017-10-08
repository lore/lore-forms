import React from 'react';
import Error from './Error';
import PayloadStates from '../../constants/PayloadStates';

export default React.createClass({
  displayName: 'Error',

  propTypes: {
    request: React.PropTypes.object
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

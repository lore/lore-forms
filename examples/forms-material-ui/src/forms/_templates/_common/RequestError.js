import React from 'react';
import Error from './Error';
import PayloadStates from '../../../constants/PayloadStates';

export default React.createClass({
  displayName: 'RequestError',

  propTypes: {
    request: React.PropTypes.object,
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    children: React.PropTypes.func
  },

  render: function() {
    const {
      request,
      error,
      children
    } = this.props;

    if (error) {
      return (
        <Error error={error} />
      );
    }

    if (request) {
      if (children) {
        let error = children(request);
        if (error) {
          return (
            <Error error={error} />
          );
        }
      }

      if (
        request.state === PayloadStates.ERROR_CREATING ||
        request.state === PayloadStates.ERROR_UPDATING ||
        request.state === PayloadStates.ERROR_FETCHING ||
        request.state === PayloadStates.ERROR_DELETING
      ) {
        return (
          <Error error={request.error} />
        );
      }
    }

    return null;
  }

});

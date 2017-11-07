import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { CircularProgress } from 'material-ui';
import { PayloadStates } from 'lore-utils';
import _ from 'lodash';

const styles = {
  container: {
    paddingTop: '24px'
  },
  spinner: {
    textAlign: 'center',
    padding: '32px'
  }
};

export default createReactClass({
  displayName: 'Request',

  propTypes: {
    request: PropTypes.object,
    reducer: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    children: PropTypes.node
  },

  getInitialState: function() {
    return {
      request: this.props.request
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var storeState = lore.store.getState();
    var request = this.props.singleton ? (
      storeState[this.props.reducer]
    ) : (
      storeState[this.props.reducer].byCid[nextProps.request.cid]
    );

    // if the resource was deleted, it typically won't be the in store
    if (
      this.state.request &&
      this.state.request.state === PayloadStates.DELETING &&
      !request
    ) {
      this.props.onSuccess();
      this.setState({
        request: request
      });
    }

    if (!request) {
      return;
    }

    if (
      request.state === PayloadStates.RESOLVED ||
      request.state === PayloadStates.DELETED
    ) {
      this.props.onSuccess(request);
    }

    if (
      request.state === PayloadStates.ERROR_CREATING ||
      request.state === PayloadStates.ERROR_UPDATING ||
      request.state === PayloadStates.ERROR_FETCHING ||
      request.state === PayloadStates.ERROR_DELETING
    ) {
      this.props.onError(request);
    }

    this.setState({
      request: request
    });
  },

  render: function () {
    const { children } = this.props;

    if (children) {
      if (_.isFunction(children)) {
        return children();
      }
      return children;
    }

    return (
      <div style={styles.container}>
        <div className="mui-card-text">
          <div className="row">
            <div className="col-md-12">
              <div style={styles.spinner}>
                <CircularProgress size={80} thickness={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

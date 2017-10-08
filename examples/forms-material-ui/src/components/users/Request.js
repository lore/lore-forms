import React from 'react';
import { CircularProgress } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';

var styles = {
  container: {
    paddingTop: '24px'
  },
  spinner: {
    textAlign: 'center',
    padding: '32px'
  }
};

export default React.createClass({
  displayName: 'Request',

  propTypes: {
    request: React.PropTypes.object,
    reducer: React.PropTypes.string.isRequired,
    onSuccess: React.PropTypes.func.isRequired,
    onError: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      request: this.props.request
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var storeState = lore.store.getState();
    var request = storeState[this.props.reducer].byCid[nextProps.request.cid];

    if (request.state === PayloadStates.RESOLVED) {
      this.props.onSuccess(request);
    }

    if (request.state === PayloadStates.ERROR_CREATING) {
      this.props.onError(request);
    }

    this.setState({
      request: request
    });
  },

  render: function () {
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

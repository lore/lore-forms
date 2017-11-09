import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { CircularProgress } from 'material-ui';
import Request from './_common/Request';

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
  displayName: 'RequestTemplate',

  render: function () {
    return (
      <Request {...this.props}>
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
      </Request>
    );
  }
});

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { RaisedButton } from 'material-ui';

var styles = {
  container: {
    paddingTop: '24px'
  },
  text: {
    fontSize: '24px',
    textAlign: 'center'
  }
};

export default createReactClass({
  displayName: 'SuccessMessage',

  propTypes: {
    children: PropTypes.node.isRequired,
    onNext: PropTypes.func.isRequired,
    raw: PropTypes.bool
  },

  render: function() {
    var {
      children,
      raw
    } = this.props;

    return (
      <div style={styles.container}>
        <div className="mui-card-text">
          <div className="row">
            <div className="col-md-12">
              { raw ? children : (
                <h2 style={styles.text}>
                  {children}
                </h2>
              )}
            </div>
          </div>
        </div>
        <div className="mui-card-actions">
          <RaisedButton
            label="Close"
            primary={true}
            onTouchTap={this.props.onNext}
          />
        </div>
      </div>
    );
  }

});

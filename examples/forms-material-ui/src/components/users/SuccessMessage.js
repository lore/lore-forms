import React from 'react';
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

export default React.createClass({
  displayName: 'SuccessMessage',

  propTypes: {
    children: React.PropTypes.node.isRequired,
    onNext: React.PropTypes.func.isRequired,
    raw: React.PropTypes.bool
  },

  render: function() {
    var {
      children,
      raw
    } = this.props;

    return (
      <div style={styles.container}>
        <div className="mui-card-text" style={{paddingBottom: '0px'}}>
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

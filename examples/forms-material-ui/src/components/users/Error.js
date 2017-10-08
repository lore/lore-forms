import React from 'react';
import _ from 'lodash';

export default React.createClass({
  displayName: 'Error',

  propTypes: {
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired
  },

  getStyles: function() {
    return {
      container: {
        backgroundColor: '#E8E8E8',
        marginLeft: '-40px',
        marginRight: '-40px',
        marginBottom: '16px'
      },
      text: {
        lineHeight: '24px',
        padding: '16px 40px',
        color: '#DA3A3A',
        fontSize: '16px',
        marginBottom: '0px'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();
    var error = this.props.error;
    var text = '';

    if (_.isPlainObject(error)) {
      text = JSON.stringify(error);
    } else if(_.isArray(error)) {
      text = JSON.stringify(error);
    } else {
      text = error;
    }

    return (
      <div className="row" style={styles.container}>
        <div className="col-md-12">
          <h5 style={styles.text}>
            {text}
          </h5>
        </div>
      </div>
    )
  }

});

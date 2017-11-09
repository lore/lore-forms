import React from 'react';
import _ from 'lodash';

const styles = {
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
};

export default React.createClass({
  displayName: 'Error',

  propTypes: {
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object
    ]).isRequired
  },

  render: function() {
    var error = this.props.error;
    var text = '';

    if (_.isPlainObject(error)) {
      text = JSON.stringify(error);
    } else if(_.isArray(error)) {
      text = JSON.stringify(error);
    } else {
      text = error;
    }

    // return (
    //   <div className="row" style={styles.container}>
    //     <div className="col-md-12">
    //       <h5 style={styles.text}>
    //         {text}
    //       </h5>
    //     </div>
    //   </div>
    // );

    return (
      <div className="alert alert-danger">
        <strong>Error!</strong> {text}
      </div>
    );
  }

});

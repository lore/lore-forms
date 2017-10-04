import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
import _ from 'lodash';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'Spinner',

  propTypes: {
    display: PropTypes.func.isRequired,
    children: PropTypes.node
  },

  getDefaultProps: function() {
    return {
      display: function(props) {
        return true;
      }
    }
  },

  getStyles: function() {
    return {
      container: {
        textAlign: 'center',
        marginTop: '32px',
        marginBottom: '32px'
      }
    }
  },

  render: function () {
    var styles = this.getStyles();
    var display = this.props.display(this.props);
    var other = _.omit(this.props, ['children', 'display']);

    if (display) {
      return (
        <div style={styles.container}>
          <CircularProgress size={60} thickness={5}/>
        </div>
      );
    }

    return React.cloneElement(this.props.children, other);
  }

});

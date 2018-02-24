import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
  displayName: 'SuccessMessage',

  propTypes: {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      isVisible: true
    };
  },

  componentDidMount: function () {
    this.isMounted = true;

    setTimeout(() => {
      if (this.isMounted) {
        this.setState({
          isVisible: false
        });
      }
    }, 3000);
  },

  componentWillUnmount: function () {
    this.isMounted = false;
  },

  getDefaultProps: function () {
    return {
      title: 'Well done!',
      message: 'You successfully read this important alert message.'
    }
  },

  render: function () {
    const {isVisible} = this.state;

    return (
      <div className="alert alert-success" style={{ display: isVisible ? 'block' : 'none', marginBottom: 0 }}>
        <strong>{this.props.title}</strong> {this.props.message}
      </div>
    );
  }

});

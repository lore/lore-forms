import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'SuccessMessage',

  propTypes: {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      isVisible: true
    };
  },

  componentDidMount: function() {
    setTimeout(() => {
      if (this.isMounted()) {
        this.setState({
          isVisible: false
        })
      }
    }, 2000);
  },

  getDefaultProps: function() {
    return {
      title: 'Well done!',
      message: 'You successfully read this important alert message.'
    }
  },

  render: function() {
    var isVisible = this.state.isVisible;

    return (
      <div className="alert alert-success" style={{display: isVisible ? 'block' :'none'}}>
        <strong>{this.props.title}</strong> {this.props.message}
      </div>
    );
  }

});

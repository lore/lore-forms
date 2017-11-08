import React from 'react';

export default React.createClass({
  displayName: 'SuccessMessage',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired
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

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
    this.isMounted = true;

    setTimeout(() => {
      if (this.isMounted) {
        this.setState({
          isVisible: false
        });
      }
    }, 3000);
  },

  componentWillUnmount: function() {
    this.isMounted = false;
  },

  getDefaultProps: function() {
    return {
      title: 'Well done!',
      message: 'You successfully read this important alert message.'
    }
  },

  render: function() {
    const { isVisible } = this.state;

    return (
      <div className="alert alert-success" style={{display: isVisible ? 'block' :'none'}}>
        <strong>{this.props.title}</strong> {this.props.message}
      </div>
    );
  }

});

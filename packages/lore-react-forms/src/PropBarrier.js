import React from 'react';

export default React.createClass({
  displayName: 'PropBarrier',

  propTypes: {
    element: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      element: 'div',
      className: '',
      style: {},
    };
  },

  render: function() {
    const {
      element,
      className,
      style,
      children
    } = this.props;

    const props = {
      className: className || null,
      style: style || {}
    };

    if (children.length) {
      return React.createElement(element, props,
        this.props.children
      );
    }

    return this.props.children;
  }

});

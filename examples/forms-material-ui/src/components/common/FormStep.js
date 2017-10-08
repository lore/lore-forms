import React from 'react';

export default React.createClass({
  displayName: 'FormStep',

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'FormStep',

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

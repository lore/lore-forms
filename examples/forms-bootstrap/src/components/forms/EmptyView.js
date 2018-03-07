import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'EmptyView',

  render: function() {
    return (
      <div>
        <h3>Please select a tweet</h3>
      </div>
    );
  }

});

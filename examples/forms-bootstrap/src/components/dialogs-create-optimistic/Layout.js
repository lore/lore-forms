import React from 'react';
import createReactClass from 'create-react-class';
import Hook from './Hook';
import hookCode from '!raw-loader!./Hook';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div className="example">
        <h3>
          Dialog: Create - Optimistic
        </h3>
        <p>
          This is an optimistic dialog to create a tweet. Press the button to open the dialog, then submit
          the form.
        </p>
        <div className="form">
          <Hook />
        </div>
      </div>
    );
  }
});

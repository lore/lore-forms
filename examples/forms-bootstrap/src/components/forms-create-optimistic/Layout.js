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
          Form: Create - Optimistic
        </h3>
        <p>
          This is a basic form to create a tweet. Fill out the form and press the the submit button. A tweet will
          show up in the feed.
        </p>
        <p>
          Note that this is not a good user experience. The user has no visual confirmation the action occurred, and
          in the case of an error (which happens when you enter the text 'explode') there is no way to communicate
          that back to the user or recover from the error.
        </p>
        <p>
          This experience basically assumes the operation will always succeed and will always happen quickly.
        </p>
        <div className="form">
          <Hook />
        </div>
      </div>
    );
  }
});

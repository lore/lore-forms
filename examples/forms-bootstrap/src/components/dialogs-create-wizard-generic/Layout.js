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
          Dialog: Create - Wizard
        </h3>
        <p>
          Better form experience. Gives a visual indication when form is being saved, and displays a success
          or error message after server call completes.
        </p>
        <p>
          Created by manually building the form using React components.
        </p>
        <div className="form">
          <Hook />
        </div>
      </div>
    );
  }
});

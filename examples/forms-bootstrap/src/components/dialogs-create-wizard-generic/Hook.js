import React from 'react';
import createReactClass from 'create-react-class';
import config from './config';

export default createReactClass({
  displayName: 'Hook',

  render: function() {
    return (
      <div style={{ padding: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            lore.dialog.show(() => (
              lore.dialogs.tweet.create(config)
            ))
          }}
        >
          Open Dialog
        </button>
      </div>
    );
  }

});

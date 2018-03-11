import React from 'react';
import createReactClass from 'create-react-class';
import { RaisedButton } from 'material-ui';

export default createReactClass({
  displayName: 'Hook',

  render: function() {
    return (
      <RaisedButton
        label="Open Dialog"
        primary={true}
        onClick={() => {
          lore.dialog.show(() => (
            lore.dialogs.tweet.create({
              blueprint: 'optimistic'
            })
          ))
        }}
      />
    );
  }

});

import React from 'react';
import createReactClass from 'create-react-class';
import { RaisedButton } from 'material-ui';

export default createReactClass({
  displayName: 'CreateCard.form.hook',

  onClick: function() {
    lore.dialog.show(() => {
      return lore.dialogs.tweet.create();
    });
  },

  render: function() {
    return (
      <div>
        <RaisedButton
          label="Open Dialog"
          primary={true}
          onTouchTap={this.onClick}
        />
      </div>
    );
  }

});

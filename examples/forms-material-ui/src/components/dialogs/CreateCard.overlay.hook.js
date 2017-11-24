import React from 'react';
import createReactClass from 'create-react-class';
import { RaisedButton } from 'material-ui';

export default createReactClass({
  displayName: 'CreateCard.overlay.hook',

  onClick: function() {
    lore.dialog.show(() => {
      return lore.dialogs.tweet.create({
        template: 'overlay'
      });
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


import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'CreateCard.form.hook',

  render: function() {
    return lore.forms.user.create({
      template: 'default'
    });
  }

});

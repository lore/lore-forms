import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from 'material-ui';

export default createReactClass({
  displayName: 'Quote',

  propTypes: {
    quote: PropTypes.object.isRequired
  },

  onTouchTap: function() {
    const { quote } = this.props;
    lore.actions.quote.destroy(quote);
  },

  render: function() {
    const { quote } = this.props;

    return (
      <ListItem
        leftAvatar={<Avatar src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png" />}
        primaryText={quote.data.quote}
        secondaryText={quote.data.author}
        secondaryTextLines={2}
        onTouchTap={this.onTouchTap}
      />
    );
  }

});

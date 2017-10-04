import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ListItem, Avatar } from 'material-ui';
import _ from 'lodash';

const User = withRouter(React.createClass({
  displayName: 'User',

  propTypes: {
    user: PropTypes.object.isRequired
  },

  onTouchTap: function() {
    var user = this.props.user;
    this.props.router.push('/users/' + user.id);
    this.props.onTouchTap.apply(arguments);
  },

  render: function() {
    var user = this.props.user;

    // get the props from the SelectableList that need to be passed down
    var other = _.omit(this.props, ['user', 'router', 'params', 'location', 'routes']);

    return (
      <ListItem
        {...other}
        leftAvatar={<Avatar src={user.data.avatar} />}
        primaryText={(
          <span>
            <span>{user.data.name}</span>
            <span className="timestamp">@{user.data.username}</span>
          </span>
        )}
        secondaryText={user.data.avatar}
        secondaryTextLines={1}
        onTouchTap={this.onTouchTap}
      />
    );
  }

}));

// we need to provide a muiName in order for SelectableList to recognize this component as a mui.ListItem
User.muiName = 'ListItem';

export default User;

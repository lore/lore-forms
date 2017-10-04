import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Paper, Subheader } from 'material-ui';

import Spinner from '../common/Spinner';
import PayloadStates from '../../constants/PayloadStates';
import SelectableList from '../SelectableList';
import User from './User';

export default lore.connect(function(getState, props){
  return {
    newUsers: getState('user.all', {
      where: function(user) {
        return !user.id || (user.data.createdAt - lore.timestamp) > 0
      },
      sortBy: function(user) {
        return -user.data.createdAt;
      }
    }),
    users: getState('user.find', {
      where: {
        createdAt_lte: lore.timestamp,
        _sort: 'createdAt',
        _order: 'DESC'
      }
    })
  }
})(
withRouter(React.createClass({
  displayName: 'List',

  propTypes: {
    users: PropTypes.object.isRequired,
    newUsers: PropTypes.object.isRequired
  },

  renderUser: function(user) {
    return (
      <User
        key={user.id || user.cid}
        value={user.id || user.cid}
        user={user}
        nestedItems={[]}
      />
    );
  },

  render: function() {
    var users = this.props.users;

    if (users.state === PayloadStates.FETCHING) {
      return (
        <Spinner/>
      );
    }

    var newUsers = this.props.newUsers.data.map(this.renderUser);

    return (
      <div>
        <Paper>
          <Subheader>
            Users
          </Subheader>
          <SelectableList defaultValue={0}>
            {newUsers}
            {users.data.map(this.renderUser)}
          </SelectableList>
        </Paper>
      </div>
    );
  }

}))
);

import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import moment from 'moment';
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
  displayName: 'CreateCard.hook',

  getInitialState: function() {
    return {
      user: null
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var user = this.state.user;

    if (!user) {
      return;
    }

    var nextUser = lore.store.getState().user.byCid[user.cid];

    if (nextUser.state === PayloadStates.RESOLVED) {
      this.setState({
        user: null
      })
    } else {
      this.setState({
        user: nextUser
      })
    }
  },

  onSubmit: function(params) {
    var action = lore.actions.user.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      user: action.payload
    });
  },

  render: function() {
    var user = this.state.user;

    return lore.forms.user.create({
      template: 'card',
      title: 'Create User',
      subtitle: 'Enter fields to describe the user',
      model: user,
      onSubmit: this.onSubmit
    });
  }

});

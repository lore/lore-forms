import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Card, CardTitle, CircularProgress } from 'material-ui';
import _ from 'lodash';
import PayloadStates from '../../constants/PayloadStates';

// Hook Dialogs
import withMuiTheme from '../../decorators/withMuiTheme';
import validators from '../../utils/validators';
// import Template from '../../../hooks/lore-hook-forms-material-ui/Template';
import Template from '../../forms/_templates/Template';
import Overlay from '../_common/Overlay';

import tweetConfig from '../../models/tweet';

export default lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
createReactClass({
  displayName: 'UpdateCard.template',

  propTypes: {
    tweet: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    var tweet = this.props.tweet;
    return {
      userId: tweet.data.userId,
      text: tweet.data.text
    }
  },

  onSubmit: function() {
    var tweet = this.props.tweet;
    var params = this.state;
    lore.actions.tweet.update(tweet, params);
  },

  getForm: function() {
    var data = this.state;

    return React.createElement(Template, _.merge({}, tweetConfig.forms, {
      fields: {
        text: {
          data: data.text
        },
        userId: {
          data: data.userId
        }
      },
      onSubmit: this.onSubmit
    }));
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;

    return (
      <Overlay model={tweet}>
        <Card className="form-card">
          <CardTitle
            title="Update Tweet"
            subtitle="Change the text or user of the tweet" />
          {user.state === PayloadStates.RESOLVED ? this.getForm() : <CircularProgress />}
        </Card>
      </Overlay>
    );
  }
})
);

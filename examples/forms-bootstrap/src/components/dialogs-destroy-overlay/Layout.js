import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Hook from './Hook';
import hookCode from '!raw-loader!./Hook';

export default lore.connect(function(getState, props) {
  const { tweetId } = props.params;

  return {
    tweet: getState('tweet.byId', {
      id: tweetId
    })
  }
})(
createReactClass({
  displayName: 'Layout',

  propTypes: {
    tweet: PropTypes.object.isRequired
  },

  render: function() {
    const { tweet } = this.props;

    return (
      <div className="example">
        <h3>
          Dialog: Destroy - Overlay
        </h3>
        <p>
          This is an optimistic dialog to create a tweet. Press the button to open the dialog, then submit
          the form.
        </p>
        <div className="form">
          <Hook model={tweet} />
        </div>
      </div>
    );
  }
})
);

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CodeExample from '../_common/CodeExample';
import Hook from './Hook';
import hookCode from '!raw-loader!./Hook';
import { Card } from 'material-ui';

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
      <CodeExample
        code={hookCode}
        title="Code"
      >
        <Card>
          <Hook model={tweet} />
        </Card>
      </CodeExample>
    );
  }
})
);

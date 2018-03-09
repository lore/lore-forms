import React from 'react';
import createReactClass from 'create-react-class';
import CodeExample from '../_common/CodeExample';
import CreateCardOverlayHook from './Hook';
import createCardOverlayHookCode from '!raw-loader!./Hook';
import { Card } from 'material-ui';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <CodeExample
        code={createCardOverlayHookCode}
        title="Code"
      >
        <Card>
          <CreateCardOverlayHook />
        </Card>
      </CodeExample>
    );
  }

});

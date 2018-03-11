import React from 'react';
import createReactClass from 'create-react-class';
import CodeExample from '../_common/CodeExample';
import CreateCardFormHook from './Hook';
import createCardFormHookCode from '!raw-loader!./Hook';
import { Card } from 'material-ui';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <CodeExample
        code={createCardFormHookCode}
        title="Code"
      >
        <Card>
          <CreateCardFormHook />
        </Card>
      </CodeExample>
    );
  }
});

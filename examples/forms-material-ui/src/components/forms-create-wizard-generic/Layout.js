import React from 'react';
import createReactClass from 'create-react-class';
import CodeExample from '../_common/CodeExample';
import Hook from './Hook';
import hookCode from '!raw-loader!./Hook';
import { Card } from 'material-ui';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <CodeExample
        code={hookCode}
        title="Code"
      >
        <Card>
          <Hook />
        </Card>
      </CodeExample>
    );
  }

});

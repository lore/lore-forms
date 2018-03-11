import React from 'react';
import createReactClass from 'create-react-class';
import CodeExample from '../_common/CodeExample';
import CreateCardFormHook from './Hook';
import createCardFormHookCode from '!raw-loader!./Hook';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <CodeExample
        code={createCardFormHookCode}
        title="Code"
      >
        <CreateCardFormHook />
      </CodeExample>
    );
  }

});

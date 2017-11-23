import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';

// Forms
import CreateCardForm from './CreateCard.form';
import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardFormHook from './CreateCard.form.hook';
import createCardFormHookCode from '!raw-loader!./CreateCard.form.hook';

import List from './List';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout',

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div>
        <div style={{paddingLeft: '256px'}}>
          <AppBar
            title="Fields - Create"
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>

                <h3>Description</h3>
                <h4 style={{ paddingTop: 0 }}>
                  This is a sandbox to see what the built-in fields look like.
                </h4>

                <br/>
                <h3>Form (Component)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below demonstrates how to use all fields directly as React components from
                  the <strong>lore-react-forms-material-ui</strong> library. Created by manually building the form using React components.
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormCode}
                  title="Component Form (Basic)"
                >
                  <CreateCardForm />
                </CodeExample>

                <br/>
                <h3>Form (Hook)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  This shows the fields being loaded from a config object in <strong>forms/user.js</strong>.
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormHookCode}
                  title="Hook Form (Basic)"
                >
                  <CreateCardFormHook />
                </CodeExample>
              </div>
              <Drawer width={300} openSecondary={true} open={true} >
                <AppBar
                  title="Tweets"
                  showMenuIconButton={false}
                />
                <List />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';

// Forms
import CreateCardFormHook from './CreateCard.form.hook';
import createCardFormHookCode from '!raw-loader!./CreateCard.form.hook';
import CreateCardOverlayHook from './CreateCard.overlay.hook';
import createCardOverlayHookCode from '!raw-loader!./CreateCard.overlay.hook';
import CreateCardWizardHook from './CreateCard.wizard.hook';
import createCardWizardHookCode from '!raw-loader!./CreateCard.wizard.hook';

import List from './List';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout.form',

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div>
        <div style={{paddingLeft: '256px'}}>
          <AppBar
            title="Hook - Create"
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>

                <h3>Description</h3>
                <h4 style={{ paddingTop: 0 }}>
                  This page displays the 3 built-in templates for <strong>create</strong> forms.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  All of these forms can be customized for your app. They're just meant to be a starting point.
                </h4>

                <br/>
                <h3>Default Template</h3>
                <h4 style={{ paddingTop: 0 }}>
                  ???
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormHookCode}
                  title="Default"
                >
                  <CreateCardFormHook />
                </CodeExample>

                <br/>
                <h3>Overlay Template</h3>
                <h4 style={{ paddingTop: 0 }}>
                  ???
                </h4>
                <br/>
                <CodeExample
                  code={createCardOverlayHookCode}
                  title="Overlay"
                >
                  <CreateCardOverlayHook />
                </CodeExample>

                <br/>
                <h3>Wizard Template</h3>
                <h4 style={{ paddingTop: 0 }}>
                  ???
                </h4>
                <br/>
                <CodeExample
                  code={createCardWizardHookCode}
                  title="Wizard"
                >
                  <CreateCardWizardHook />
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

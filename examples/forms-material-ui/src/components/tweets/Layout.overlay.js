import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';

// Overlay
import CreateCardOverlay from './CreateCard.overlay';
import createCardOverlayCode from '!raw-loader!./CreateCard.overlay';
import CreateCardOverlayConfig1 from './CreateCard.overlay.config.1';
import createCardOverlayConfig1Code from '!raw-loader!./CreateCard.overlay.config.1';
import CreateCardOverlayConfig2 from './CreateCard.overlay.config.2';
import createCardOverlayConfig2Code from '!raw-loader!./CreateCard.overlay.config.2';
import CreateCardOverlayHook from './CreateCard.overlay.hook';
import createCardOverlayHookCode from '!raw-loader!./CreateCard.overlay.hook';

import List from './List';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout.overlay',

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div>
        <div style={{paddingLeft: '256px'}}>
          <AppBar
            title="Overlay Form"
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>

                <h3>Description</h3>
                <h4 style={{ paddingTop: 0 }}>
                  Better form experience. Gives a visual indication when form is being saved, and displays a success
                  or error message after server call completes.
                </h4>
                Created by manually building the form using React components.

                <br/>
                <h3>Form (Component)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below demonstrates how to build the form using components from
                  the <strong>lore-react-forms</strong> library. Created by manually building the form using React components.
                </h4>
                <br/>
                <CodeExample
                  code={createCardOverlayCode}
                  title="Component Form (Overlay)"
                >
                  <CreateCardOverlay />
                </CodeExample>

                <br/>
                <h3>Form (Config #1)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below demonstrates how to build the form using components from
                  the <strong>lore-react-forms</strong> library. Created by manually building the form using React components.
                </h4>
                <br/>
                <CodeExample
                  code={createCardOverlayConfig1Code}
                  title="Config Form #1 (Overlay)"
                >
                  <CreateCardOverlayConfig1 />
                </CodeExample>

                <br/>
                <h3>Form (Config #2)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below builds on the example above by breaking out certain components into a configuration.
                </h4>
                <br/>
                <CodeExample
                  code={createCardOverlayConfig2Code}
                  title="Config Form #2 (Overlay)"
                >
                  <CreateCardOverlayConfig2 />
                </CodeExample>

                <br/>
                <h3>Form (Hook)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  This code uses a basic template along with the <strong>lore-hook-forms-material-ui</strong> library.
                </h4>
                <br/>
                <CodeExample
                  code={createCardOverlayHookCode}
                  title="Hook Form (Overlay)"
                >
                  <CreateCardOverlayHook />
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

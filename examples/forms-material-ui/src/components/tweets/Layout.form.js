import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';

// Forms
import CreateCardForm from './CreateCard.form';
import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardFormConfig1 from './CreateCard.form.config.1';
import createCardFormConfig1Code from '!raw-loader!./CreateCard.form.config.1';
import CreateCardFormConfig2 from './CreateCard.form.config.2';
import createCardFormConfig2Code from '!raw-loader!./CreateCard.form.config.2';
import CreateCardFormHook from './CreateCard.form.hook';
import createCardFormHookCode from '!raw-loader!./CreateCard.form.hook';

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
            title="Basic Form"
            showMenuIconButton={false}
          />
        </div>
        <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
          <div style={{paddingLeft: '256px'}}>
            <div className="row">
              <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>

                <h3>Description</h3>
                <h4 style={{ paddingTop: 0 }}>
                  This is a basic form to create a tweet. Fill out the form and press the the submit button. A tweet will
                  show up in the feed.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  Note that this is not a good user experience. The user has no visual confirmation the action occurred, and
                  in the case of an error (which happens when you enter the text 'explode') there is no way to communicate
                  that back to the user or recover from the error.
                </h4>
                <h4 style={{ paddingTop: 0 }}>
                  This experience basically assumes the operation will always succeed and will always happen quickly.
                </h4>

                <br/>
                <h3>Form (Component)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below demonstrates how to build the form using components from
                  the <strong>lore-react-forms</strong> library. Created by manually building the form using React components.
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormCode}
                  title="Component Form (Basic)"
                >
                  <CreateCardForm />
                </CodeExample>

                <br/>
                <h3>Form (Config #1)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below builds on the example above by breaking out certain components into a configuration.
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormConfig1Code}
                  title="Config Form #1 (Basic)"
                >
                  <CreateCardFormConfig1 />
                </CodeExample>

                <br/>
                <h3>Form (Config #2)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  More configuration.
                </h4>
                <br/>
                <CodeExample
                  code={createCardFormConfig2Code}
                  title="Config Form #2 (Basic)"
                >
                  <CreateCardFormConfig2 />
                </CodeExample>

                <br/>
                <h3>Form (Hook)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  This code uses a basic template along with the <strong>lore-hook-forms-material-ui</strong> library.
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

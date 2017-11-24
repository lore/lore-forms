import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar } from 'material-ui';

// Wizards
import CreateCardWizardRequest from './CreateCard.wizard';
import createCardWizardRequestCode from '!raw-loader!./CreateCard.wizard';
// import CreateCardWizardRequestConfig from './CreateCard.wizard.request.config.1';
// import createCardWizardRequestConfigCode from '!raw-loader!./CreateCard.wizard.request.config.1';
// import CreateCardWizardRequestConfig2 from './CreateCard.wizard.request.config.2';
// import createCardWizardRequestConfig2Code from '!raw-loader!./CreateCard.wizard.request.config.2';
// import CreateCardWizardRequestConfig3 from './CreateCard.wizard.request.config.3';
// import createCardWizardRequestConfig3Code from '!raw-loader!./CreateCard.wizard.request.config.3';
import CreateCardWizardRequestHook from './CreateCard.wizard.hook';
import createCardWizardRequestHookCode from '!raw-loader!./CreateCard.wizard.hook';

import List from './List';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout.wizard',

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div>
        <div style={{paddingLeft: '256px'}}>
          <AppBar
            title="Wizard Form"
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
                  code={createCardWizardRequestCode}
                  title="Component Form (Wizard w/ Request Step)"
                  description="Created by stringing components together"
                >
                  <CreateCardWizardRequest />
                </CodeExample>

                {/*<br/>*/}
                {/*<h3>Form (Config #2)</h3>*/}
                {/*<h4 style={{ paddingTop: 0 }}>*/}
                  {/*The code below builds on the example above by breaking out certain components into a configuration.*/}
                {/*</h4>*/}
                {/*<br/>*/}
                {/*<CodeExample*/}
                  {/*code={createCardWizardRequestConfigCode}*/}
                  {/*title="Config Form #1 (Wizard w/ Request Step)"*/}
                  {/*description="Created by using config + SchemaForm to display forms"*/}
                {/*>*/}
                  {/*<CreateCardWizardRequestConfig />*/}
                {/*</CodeExample>*/}

                {/*<br/>*/}
                {/*<h3>Form (Config #2)</h3>*/}
                {/*<h4 style={{ paddingTop: 0 }}>*/}
                  {/*The code below builds on the example above by breaking out certain components into a configuration.*/}
                {/*</h4>*/}
                {/*<br/>*/}
                {/*<CodeExample*/}
                  {/*code={createCardWizardRequestConfig2Code}*/}
                  {/*title="Config Form #2 (Wizard w/ Request Step)"*/}
                  {/*description="Created by using templates for each step"*/}
                {/*>*/}
                  {/*<CreateCardWizardRequestConfig2 />*/}
                {/*</CodeExample>*/}

                {/*<br/>*/}
                {/*<h3>Form (Config #3)</h3>*/}
                {/*<h4 style={{ paddingTop: 0 }}>*/}
                  {/*The code below builds on the example above by breaking out certain components into a configuration.*/}
                {/*</h4>*/}
                {/*<br/>*/}
                {/*<CodeExample*/}
                  {/*code={createCardWizardRequestConfig3Code}*/}
                  {/*title="Config Form #3 (Wizard w/ Request Step)"*/}
                  {/*description="Created by moving the whole wizard into a generic template"*/}
                {/*>*/}
                  {/*<CreateCardWizardRequestConfig3 />*/}
                {/*</CodeExample>*/}

                <br/>
                <h3>Form (Hook)</h3>
                <h4 style={{ paddingTop: 0 }}>
                  The code below builds on the example above by breaking out certain components into a configuration.
                </h4>
                <br/>
                <CodeExample
                  code={createCardWizardRequestHookCode}
                  title="Hook Form (Wizard w/ Request Step)"
                  description="Created configuring the forms hook to use the template"
                >
                  <CreateCardWizardRequestHook />
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

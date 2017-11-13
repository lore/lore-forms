import React from 'react';
import createReactClass from 'create-react-class';
import PayloadStates from '../../constants/PayloadStates';

// Forms
import CreateCardForm from './CreateCard.form';
import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardFormConfig1 from './CreateCard.form.config.1';
import createCardFormConfig1Code from '!raw-loader!./CreateCard.form.config.1';
import CreateCardFormConfig2 from './CreateCard.form.config.2';
import createCardFormConfig2Code from '!raw-loader!./CreateCard.form.config.2';
import CreateCardFormHook from './CreateCard.form.hook';
import createCardFormHookCode from '!raw-loader!./CreateCard.form.hook';

// Overlay
// import CreateCardHookOverlay from './CreateCard.hook.overlay';
// import createCardHookOverlayCode from '!raw-loader!./CreateCard.hook.overlay';

// Wizards
import CreateCardWizardRequest from './CreateCard.wizard.request';
import createCardWizardRequestCode from '!raw-loader!./CreateCard.wizard.request';
import CreateCardWizardRequestConfig from './CreateCard.wizard.request.config.1';
import createCardWizardRequestConfigCode from '!raw-loader!./CreateCard.wizard.request.config.1';
import CreateCardWizardRequestConfig2 from './CreateCard.wizard.request.config.2';
import createCardWizardRequestConfig2Code from '!raw-loader!./CreateCard.wizard.request.config.2';
import CreateCardWizardRequestConfig3 from './CreateCard.wizard.request.config.3';
import createCardWizardRequestConfig3Code from '!raw-loader!./CreateCard.wizard.request.config.3';
import CreateCardWizardRequestHook from './CreateCard.wizard.request.hook';
import createCardWizardRequestHookCode from '!raw-loader!./CreateCard.wizard.request.hook';
import CreateCardHookWizard from './CreateCard.hook.wizard';
import createCardHookWizardCode from '!raw-loader!./CreateCard.hook.wizard';
import CreateCardHookWizardRequest from './CreateCard.hook.wizard.request';
import createCardHookWizardRequestCode from '!raw-loader!./CreateCard.hook.wizard.request';
// import CustomCreateCardHook from './CreateCard.hook.custom';
// import customCreateCardHookCode from '!raw-loader!./CreateCard.hook.custom';

import UpdateCardForm from './UpdateCard.form';
import updateCardFormCode from '!raw-loader!./UpdateCard.form';
// import UpdateCardTemplate from './UpdateCard.template';
// import updateCardTemplateCode from '!raw-loader!./UpdateCard.template';
// import CustomUpdateCardTemplate from './UpdateCard.template.custom';
// import customUpdateCardTemplateCode from '!raw-loader!./UpdateCard.template.custom';
// import UpdateCardHook from './UpdateCard.hook';
// import updateCardHookCode from '!raw-loader!./UpdateCard.hook';
// import CustomUpdateCardHook from './UpdateCard.hook.custom';
// import customUpdateCardHookCode from '!raw-loader!./UpdateCard.hook.custom';
import List from './List';
import Connect from '../Connect';
import Spinner from '../Spinner';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout',

  getTweet: function(getState, props) {
    const { tweetId } = this.props.params;

    return {
      tweet: getState('tweet.byId', {
        id: tweetId
      }),
      users: getState('user.find')
    }
  },

  shouldDisplaySpinner: function() {
    const { tweetId } = this.props.params;
    const tweet = lore.getState('tweet.byId', {
      id: tweetId
    });
    const users = lore.getState('user.find');
    return (
      tweet.state === PayloadStates.FETCHING ||
      users.state === PayloadStates.FETCHING
    );
  },

  render: function() {
    const { tweetId } = this.props.params;

    return (
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">
            {tweetId ? "Update" : "Create"}
          </h2>
          <br/>
          <h1>Forms</h1>
          <h4>
            Not a great experience. Assumes the operation will succeed and happen quickly. Relies on
            successful optimistic experience to provide decent UX.
          </h4>
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardFormCode}
              title="Component Form (Basic)"
              description="Created by manually building the form using React components."
            >
              <CreateCardForm />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardFormConfig1Code}
              title="Config Form #1 (Basic)"
              description="Created by manually building the form using React components."
            >
              <CreateCardFormConfig1 />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardFormConfig2Code}
              title="Config Form #2 (Basic)"
              description="Created by manually building the form using React components."
            >
              <CreateCardFormConfig2 />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardFormHookCode}
              title="Hook Form (Basic)"
              description="Created by manually building the form using React components."
            >
              <CreateCardFormHook />
            </CodeExample>
          )}
          {/*<br/>*/}
          {/*{tweetId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardFormCode}*/}
              {/*title="Component Form"*/}
              {/*description="Created by manually building the form using React components"*/}
            {/*>*/}
              {/*<CreateCardForm />*/}
            {/*</CodeExample>*/}
          {/*) }*/}
          {/*<br/>*/}
          {/*{tweetId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardHookCode}*/}
              {/*title="Hook Form (Card)"*/}
              {/*description="Created by invoking lore.forms.tweet.create using config in forms/tweet/create"*/}
            {/*>*/}
              {/*<CreateCardHook />*/}
            {/*</CodeExample>*/}
          {/*) }*/}
          {/*<br/>*/}
          {/*{tweetId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardHookOverlayCode}*/}
              {/*title="Hook Form (Card w/ Overlay)"*/}
              {/*description="Created by wrapping the card template with an Overlay template"*/}
            {/*>*/}
              {/*<CreateCardHookOverlay />*/}
            {/*</CodeExample>*/}
          {/*) }*/}
          {/*<br/>*/}
          {/*{tweetId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardHookWizardCode}*/}
              {/*title="Hook Form (Wizard)"*/}
              {/*description="Created by breaking the form config into a series of steps"*/}
            {/*>*/}
              {/*<CreateCardHookWizard />*/}
            {/*</CodeExample>*/}
          {/*) }*/}
          <br/>
          <h1>Wizards</h1>
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardWizardRequestCode}
              title="Component Form (Wizard w/ Request Step)"
              description="Created by stringing components together"
            >
              <CreateCardWizardRequest />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardWizardRequestConfigCode}
              title="Config Form #1 (Wizard w/ Request Step)"
              description="Created by using config + SchemaForm to display forms"
            >
              <CreateCardWizardRequestConfig />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardWizardRequestConfig2Code}
              title="Config Form #2 (Wizard w/ Request Step)"
              description="Created by using templates for each step"
            >
              <CreateCardWizardRequestConfig2 />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardWizardRequestConfig3Code}
              title="Config Form #3 (Wizard w/ Request Step)"
              description="Created by moving the whole wizard into a generic template"
            >
              <CreateCardWizardRequestConfig3 />
            </CodeExample>
          )}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardWizardRequestHookCode}
              title="Hook Form (Wizard w/ Request Step)"
              description="Created configuring the forms hook to use the template"
            >
              <CreateCardWizardRequestHook />
            </CodeExample>
          )}
          {/*<br/>*/}
          {/*{tweetId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardHookWizardRequestCode}*/}
              {/*title="Hook Form (Wizard w/ Request Step)"*/}
              {/*description="Created by wrapping the wizard template with a Request template"*/}
            {/*>*/}
              {/*<CreateCardHookWizardRequest />*/}
            {/*</CodeExample>*/}
          {/*) }*/}
          <br/>
          <h1>Dialogs</h1>
          <br/>
        </div>
        <div className="col-md-4">
          <List />
        </div>
      </div>
    );
  }

});

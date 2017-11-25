import React from 'react';
import createReactClass from 'create-react-class';
import PayloadStates from '../../constants/PayloadStates';
import CreateCardForm from './CreateCard.form';
import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardHook from './CreateCard.hook';
import createCardHookCode from '!raw-loader!./CreateCard.hook';

import CreateCardFormWizard from './CreateCard.form.wizard';
import createCardFormWizardCode from '!raw-loader!./CreateCard.form.wizard';
import CreateCardTemplateWizard from './CreateCard.template.wizard';
import createCardTemplateWizardCode from '!raw-loader!./CreateCard.template.wizard';
import CreateCardTemplateWizardConcept from './CreateCard.template.wizard.concept';
import createCardTemplateWizardConceptCode from '!raw-loader!./CreateCard.template.wizard.concept';

import UpdateCardHook from './UpdateCard.hook';
import updateCardHookCode from '!raw-loader!./UpdateCard.hook';
import List from './List';
import { Connect } from 'lore-hook-connect';
import Spinner from '../Spinner';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout',

  getUser: function(getState, props) {
    var userId = this.props.params.userId;

    return {
      user: getState('user.byId', {
        id: userId
      })
    }
  },

  shouldDisplaySpinner: function() {
    var userId = this.props.params.userId;
    var user = lore.getState('user.byId', {
      id: userId
    });
    return (
      user.state === PayloadStates.FETCHING
    );
  },

  render: function() {
    var userId = this.props.params.userId;

    return (
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">
            {userId ? "Update" : "Create"}
          </h2>
          {/*<br/>*/}
          {/*{userId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardFormCode}*/}
              {/*title="Component Form"*/}
              {/*description="Created by manually building the form using React components"*/}
            {/*>*/}
              {/*<CreateCardForm />*/}
            {/*</CodeExample>*/}
          {/*)}*/}
          {/*<br/>*/}
          {/*{userId ? (*/}
            {/*<CodeExample*/}
              {/*code={updateCardHookCode}*/}
              {/*title="Hook Form"*/}
              {/*description="Created by providing a config to the forms hook"*/}
            {/*>*/}
              {/*<Connect callback={this.getUser}>*/}
                {/*<Spinner display={this.shouldDisplaySpinner}>*/}
                  {/*<UpdateCardHook key={userId} />*/}
                {/*</Spinner>*/}
              {/*</Connect>*/}
            {/*</CodeExample>*/}
          {/*) : (*/}
            {/*<CodeExample*/}
              {/*code={createCardHookCode}*/}
              {/*title="Hook Form"*/}
              {/*description="Created by providing a config to the forms hook"*/}
            {/*>*/}
              {/*<CreateCardHook />*/}
            {/*</CodeExample>*/}
          {/*)}*/}
          {/*<br/>*/}
          {/*{userId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardFormWizardCode}*/}
              {/*title="Component Form (Wizard)"*/}
              {/*description="Created by manually building the form using React components"*/}
            {/*>*/}
              {/*<CreateCardFormWizard />*/}
            {/*</CodeExample>*/}
          {/*)}*/}
          {/*<br/>*/}
          {/*{userId ? null : (*/}
            {/*<CodeExample*/}
              {/*code={createCardTemplateWizardCode}*/}
              {/*title="Template Form (Wizard)"*/}
              {/*description="Created by supplying a config to a template"*/}
            {/*>*/}
              {/*<CreateCardTemplateWizard />*/}
            {/*</CodeExample>*/}
          {/*)}*/}
          {/*<br/>*/}
          {userId ? null : (
            <CodeExample
              code={createCardTemplateWizardConceptCode}
              title="Template Form Concept (Wizard)"
              description="Created by supplying a config to a template that cascades the config through components"
            >
              <CreateCardTemplateWizardConcept />
            </CodeExample>
          )}
        </div>
        <div className="col-md-4">
          <List />
        </div>
      </div>
    );
  }

});

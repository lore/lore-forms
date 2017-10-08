import React from 'react';
import createReactClass from 'create-react-class';
import PayloadStates from '../../constants/PayloadStates';
import CreateCardTemplateWizardConcept from './CreateCard.template.wizard.concept';
import createCardTemplateWizardConceptCode from '!raw-loader!./CreateCard.template.wizard.concept';
import UserList from '../users/List';
import TweetList from '../tweets/List';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    var userId = this.props.params.userId;

    return (
      <div className="row">
        <div className="col-md-3">
          <UserList />
        </div>
        <div className="col-md-6">
          <h2 className="text-center">
            {userId ? "Update" : "Create"}
          </h2>
          <CodeExample
            code={createCardTemplateWizardConceptCode}
            title="Template Form Concept (Wizard)"
            description="Created by supplying a config to a template that cascades the config through components"
          >
            <CreateCardTemplateWizardConcept />
          </CodeExample>
        </div>
        <div className="col-md-3">
          <TweetList />
        </div>
      </div>
    );
  }

});

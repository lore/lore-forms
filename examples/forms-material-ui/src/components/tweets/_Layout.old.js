import React from 'react';
import createReactClass from 'create-react-class';
import PayloadStates from '../../constants/PayloadStates';

import CreateCardForm from './CreateCard.form';
import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardTemplate from './CreateCard.template.old';
import createCardTemplateCode from '!raw-loader!./CreateCard.template.old';
import CreateCardHook from './_CreateCard.hook';
import createCardHookCode from '!raw-loader!./_CreateCard.hook';
import CustomCreateCardHook from './_CreateCard.hook.custom';
import customCreateCardHookCode from '!raw-loader!./_CreateCard.hook.custom';

import UpdateCardForm from './_UpdateCard.form';
import updateCardFormCode from '!raw-loader!./_UpdateCard.form';
import UpdateCardTemplate from './_UpdateCard.template';
import updateCardTemplateCode from '!raw-loader!./_UpdateCard.template';
import CustomUpdateCardTemplate from './_UpdateCard.template.custom';
import customUpdateCardTemplateCode from '!raw-loader!./_UpdateCard.template.custom';
import UpdateCardHook from './_UpdateCard.hook';
import updateCardHookCode from '!raw-loader!./_UpdateCard.hook';
import CustomUpdateCardHook from './_UpdateCard.hook.custom';
import customUpdateCardHookCode from '!raw-loader!./_UpdateCard.hook.custom';
import List from './List';
import { Connect } from 'lore-hook-connect';
import Spinner from '../Spinner';
import CodeExample from '../CodeExample';

export default createReactClass({
  displayName: 'Layout',

  getTweet: function(getState, props) {
    var tweetId = this.props.params.tweetId;

    return {
      tweet: getState('tweet.byId', {
        id: tweetId
      }),
      users: getState('user.find')
    }
  },

  shouldDisplaySpinner: function(tweetId) {
    var tweetId = this.props.params.tweetId;
    var tweet = lore.getState('tweet.byId', {
      id: tweetId
    });
    var users = lore.getState('user.find');
    return (
      tweet.state === PayloadStates.FETCHING ||
      users.state === PayloadStates.FETCHING
    );
  },

  render: function() {
    var tweetId = this.props.params.tweetId;

    return (
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-center">
            {tweetId ? "Update" : "Create"}
          </h2>
          <br/>
          {tweetId ? (
            <CodeExample
              code={updateCardFormCode}
              title="Component Form"
              description="Created by manually building the form using React components"
            >
              <Connect callback={this.getTweet}>
                <Spinner display={this.shouldDisplaySpinner}>
                  <UpdateCardForm key={tweetId} />
                </Spinner>
              </Connect>
            </CodeExample>
          ) : (
            <CodeExample
              code={createCardFormCode}
              title="Component Form"
              description="Created by manually building the form using React components"
            >
              <CreateCardForm />
            </CodeExample>
          ) }
          <br/>
          {tweetId ? (
            <CodeExample
              code={updateCardTemplateCode}
              title="Template Form"
              description="Created by providing a config to the template used by the forms hook"
            >
              <Connect callback={this.getTweet}>
                <Spinner display={this.shouldDisplaySpinner}>
                  <UpdateCardTemplate key={tweetId} />
                </Spinner>
              </Connect>
            </CodeExample>
          ) : (
            <CodeExample
              code={createCardTemplateCode}
              title="Template Form"
              description="Created by moving common code into a template, and passing a config object / Created by providing a config to the template used by the forms hook"
            >
              <CreateCardTemplate />
            </CodeExample>
          ) }
          <br/>
          {tweetId ? (
            <CodeExample
              code={customUpdateCardTemplateCode}
              title="Custom Template Form"
              description="Created by providing a config to a custom template"
            >
              <Connect callback={this.getTweet}>
                <Spinner display={this.shouldDisplaySpinner}>
                  <CustomUpdateCardTemplate key={tweetId} />
                </Spinner>
              </Connect>
            </CodeExample>
          ) : null }
          <br/>
          {tweetId ? (
            <CodeExample
              code={updateCardHookCode}
              title="Hook Form"
              description="Created by providing a config to the forms hook"
            >
              <Connect callback={this.getTweet}>
                <Spinner display={this.shouldDisplaySpinner}>
                  <UpdateCardHook key={tweetId} />
                </Spinner>
              </Connect>
            </CodeExample>
          ) : (
            <CodeExample
              code={createCardHookCode}
              title="Hook Form"
              description="Created by providing a config to the forms hook"
            >
              <CreateCardHook />
            </CodeExample>
          ) }
          <br/>
          {tweetId ? (
            <CodeExample
              code={customUpdateCardHookCode}
              title="Hook Form with Custom Template"
              description="Created by changing the default template in the config provided to the forms hook"
            >
              <Connect callback={this.getTweet}>
                <Spinner display={this.shouldDisplaySpinner}>
                  <CustomUpdateCardHook key={tweetId} />
                </Spinner>
              </Connect>
            </CodeExample>
          ) : (
            <CodeExample
              code={customCreateCardHookCode}
              title="Hook Form"
              description="Created by providing a config to the forms hook"
            >
              <CustomCreateCardHook />
            </CodeExample>
          ) }
        </div>
        <div className="col-md-4">
          <List />
        </div>
      </div>
    );
  }

});

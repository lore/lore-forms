import React from 'react';
import createReactClass from 'create-react-class';
import PayloadStates from '../../constants/PayloadStates';

// import CreateCardForm from './CreateCard.form';
// import createCardFormCode from '!raw-loader!./CreateCard.form';
import CreateCardHook from './CreateCard.hook';
import createCardHookCode from '!raw-loader!./CreateCard.hook';
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
          {/*<br/>*/}
          {/*{tweetId ? (*/}
            {/*<CodeExample*/}
              {/*code={updateCardFormCode}*/}
              {/*title="Component Form"*/}
              {/*description="Created by manually building the form using React components"*/}
            {/*>*/}
              {/*<Connect callback={this.getTweet}>*/}
                {/*<Spinner display={this.shouldDisplaySpinner}>*/}
                  {/*<UpdateCardForm key={tweetId} />*/}
                {/*</Spinner>*/}
              {/*</Connect>*/}
            {/*</CodeExample>*/}
          {/*) : (*/}
            {/*<CodeExample*/}
              {/*code={createCardFormCode}*/}
              {/*title="Component Form"*/}
              {/*description="Created by manually building the form using React components"*/}
            {/*>*/}
              {/*<CreateCardForm />*/}
            {/*</CodeExample>*/}
          {/*) }*/}
          <br/>
          {tweetId ? null : (
            <CodeExample
              code={createCardHookCode}
              title="Hook Form"
              description="Created by invoking lore.forms.tweet.create using config in forms/tweet/create"
            >
              <CreateCardHook />
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

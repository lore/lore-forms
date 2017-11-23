import React from 'react';
import createReactClass from 'create-react-class';
import { Drawer, AppBar, CircularProgress } from 'material-ui';
import { PayloadStates } from 'lore-utils';

// Forms
import UpdateCardFormHook from './DestroyCard.form.hook';
import updateCardFormHookCode from '!raw-loader!./DestroyCard.form.hook';
import UpdateCardOverlayHook from './DestroyCard.overlay.hook';
import updateCardOverlayHookCode from '!raw-loader!./DestroyCard.overlay.hook';
import UpdateCardWizardHook from './DestroyCard.wizard.hook';
import updateCardWizardHookCode from '!raw-loader!./DestroyCard.wizard.hook';

import List from './List';
import CodeExample from '../CodeExample';

export default lore.connect(function(getState, props) {
  const { tweetId } = props.params;

  return {
    tweet: tweetId ? getState('tweet.byId', {
      id: tweetId
    }) : null
  }
})(
createReactClass({
  displayName: 'Layout.form',

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    const {
      tweet,
      params: {
        tweetId
      }
    } = this.props;

    if (!tweet) {
      return (
        <div>
          <div style={{paddingLeft: '256px'}}>
            <AppBar
              title="Hook - Destroy"
              showMenuIconButton={false}
            />
          </div>
          <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
            <div style={{paddingLeft: '256px'}}>
              <div className="row">
                <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>
                  <h3>Please Select a Tweet</h3>
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

    if (tweet.state === PayloadStates.FETCHING) {
      return (
        <div>
          <div style={{paddingLeft: '256px'}}>
            <AppBar
              title="Hook - Destroy"
              showMenuIconButton={false}
            />
          </div>
          <div className="container-fluid" style={{ paddingTop: '15px', paddingLeft: '30px', paddingRight: '30px' }}>
            <div style={{paddingLeft: '256px'}}>
              <div className="row">
                <div style={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 300px)'}}>
                  <CircularProgress />
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

    return (
      <div key={tweetId}>
        <div style={{paddingLeft: '256px'}}>
          <AppBar
            title="Hook - Destroy"
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
                  code={updateCardFormHookCode}
                  title="Default"
                >
                  <UpdateCardFormHook model={tweet} />
                </CodeExample>

                <br/>
                <h3>Overlay Template</h3>
                <h4 style={{ paddingTop: 0 }}>
                  ???
                </h4>
                <br/>
                <CodeExample
                  code={updateCardOverlayHookCode}
                  title="Overlay"
                >
                  <UpdateCardOverlayHook model={tweet} />
                </CodeExample>

                <br/>
                <h3>Wizard Template</h3>
                <h4 style={{ paddingTop: 0 }}>
                  ???
                </h4>
                <br/>
                <CodeExample
                  code={updateCardWizardHookCode}
                  title="Wizard"
                >
                  <UpdateCardWizardHook model={tweet} />
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

})
);

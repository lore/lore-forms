import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import withMuiTheme from './src/decorators/withMuiTheme';

/**
 * Wrapping the Master component with this decorator provides an easy way
 * to redirect the user to a login experience if we don't know who they are.
 */
import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
import Master from './src/components/Master';
import Layout from './src/components/Layout';
import Quotes from './src/components/quotes/Layout';
import Users from './src/components/users/Layout';
import Tweets from './src/components/tweets/Layout';
import TweetsForm from './src/components/tweets/Layout.form';
import TweetsOverlay from './src/components/tweets/Layout.overlay';
import TweetsWizard from './src/components/tweets/Layout.wizard';
import Combined from './src/components/combined/Layout';

// Hook Routes
import HookCreateLayout from './src/components/hook-create/Layout';
import HookDestroyLayout from './src/components/hook-destroy/Layout';
import HookUpdateLayout from './src/components/hook-update/Layout';

import FieldsLayout from './src/components/fields/Layout';

import DialogsForm from './src/components/dialogs/Layout.form';
import DialogsOverlay from './src/components/dialogs/Layout.overlay';
import DialogsWizard from './src/components/dialogs/Layout.wizard';

export default (
  <Route component={UserIsAuthenticated(withMuiTheme(Master))}>
    <Redirect path="/" to="/tweets" />
    <Route path="/" component={Layout}>
      <IndexRoute component={Quotes} />
      <Route path="quotes" component={Quotes} />
      <Route path="tweets" component={Tweets} />
      <Route path="tweets-basic" component={TweetsForm} />
      <Route path="tweets-overlay" component={TweetsOverlay} />
      <Route path="tweets-wizard" component={TweetsWizard} />
      <Route path="tweets/:tweetId" component={Tweets} />

      <Route path="hook/create" component={HookCreateLayout} />
      <Route path="hook/update" component={HookUpdateLayout} />
      <Route path="hook/update/:tweetId" component={HookUpdateLayout} />
      <Route path="hook/destroy" component={HookDestroyLayout} />
      <Route path="hook/destroy/:tweetId" component={HookDestroyLayout} />

      <Route path="fields" component={FieldsLayout} />

      <Route path="dialogs-basic" component={DialogsForm} />
      <Route path="dialogs-overlay" component={DialogsOverlay} />
      <Route path="dialogs-wizard" component={DialogsWizard} />

      <Route path="users" component={Users} />
      <Route path="users/:userId" component={Users} />
      <Route path="combined" component={Combined} />
    </Route>
  </Route>
);

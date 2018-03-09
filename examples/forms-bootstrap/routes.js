import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

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

// Forms
import FormsLayout from './src/components/forms/Layout';

import FormsCreateOptimisticLayout from './src/components/forms-create-optimistic/Layout';
import FormsCreateOverlayLayout from './src/components/forms-create-overlay/Layout';
import FormsCreateWizardLayout from './src/components/forms-create-wizard/Layout';
import FormsCreateWizardGenericLayout from './src/components/forms-create-wizard-generic/Layout';

import FormsUpdateOptimisticLayout from './src/components/forms-update-optimistic/Layout';
import FormsUpdateOverlayLayout from './src/components/forms-update-overlay/Layout';
import FormsUpdateWizardLayout from './src/components/forms-update-wizard/Layout';
import FormsUpdateWizardGenericLayout from './src/components/forms-update-wizard-generic/Layout';

import FormsDestroyOptimisticLayout from './src/components/forms-destroy-optimistic/Layout';
import FormsDestroyOverlayLayout from './src/components/forms-destroy-overlay/Layout';
import FormsDestroyWizardLayout from './src/components/forms-destroy-wizard/Layout';
import FormsDestroyWizardGenericLayout from './src/components/forms-destroy-wizard-generic/Layout';

// Dialogs
import DialogsLayout from './src/components/dialogs/Layout';
import EmptyView from './src/components/dialogs/EmptyView';

import DialogsCreateOptimisticLayout from './src/components/dialogs-create-optimistic/Layout';
import DialogsCreateOverlayLayout from './src/components/dialogs-create-overlay/Layout';
import DialogsCreateWizardLayout from './src/components/dialogs-create-wizard/Layout';
import DialogsCreateWizardGenericLayout from './src/components/dialogs-create-wizard-generic/Layout';

import DialogsUpdateOptimisticLayout from './src/components/dialogs-update-optimistic/Layout';
import DialogsUpdateOverlayLayout from './src/components/dialogs-update-overlay/Layout';
import DialogsUpdateWizardLayout from './src/components/dialogs-update-wizard/Layout';
import DialogsUpdateWizardGenericLayout from './src/components/dialogs-update-wizard-generic/Layout';

import DialogsDestroyOptimisticLayout from './src/components/dialogs-destroy-optimistic/Layout';
import DialogsDestroyOverlayLayout from './src/components/dialogs-destroy-overlay/Layout';
import DialogsDestroyWizardLayout from './src/components/dialogs-destroy-wizard/Layout';
import DialogsDestroyWizardGenericLayout from './src/components/dialogs-destroy-wizard-generic/Layout';

function getFormLayout(props, title, route) {
  return (
    <FormsLayout
      {...props}
      title={title}
      route={route}
    />
  );
}

function getLayout(props, title, route) {
  return (
    <DialogsLayout
      {...props}
      title={title}
      route={route}
    />
  );
}

export default (
  <Route component={UserIsAuthenticated(Master)}>
    <Redirect path="/" to="/forms-create-optimistic" />
    <Route path="/" component={Layout}>

      {/* Forms: Create */}
      <Route path="forms-create-optimistic" component={(props) => getFormLayout(props, 'Forms: Create, Optimistic', 'forms-create-optimistic')}>
        <IndexRoute component={FormsCreateOptimisticLayout} />
      </Route>
      <Route path="forms-create-overlay" component={(props) => getFormLayout(props, 'Forms: Create, Overlay', 'forms-create-overlay')}>
        <IndexRoute component={FormsCreateOverlayLayout} />
      </Route>
      <Route path="forms-create-wizard" component={(props) => getFormLayout(props, 'Forms: Create, Wizard', 'forms-create-wizard')}>
        <IndexRoute component={FormsCreateWizardLayout} />
      </Route>
      <Route path="forms-create-wizard-generic" component={(props) => getFormLayout(props, 'Forms: Create, Wizard - Generic', 'forms-create-wizard-generic')}>
        <IndexRoute component={FormsCreateWizardGenericLayout} />
      </Route>

      {/* Forms: Update */}
      <Route path="forms-update-optimistic" component={(props) => getFormLayout(props, 'Forms: Update, Optimistic', 'forms-update-optimistic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsUpdateOptimisticLayout} />
      </Route>
      <Route path="forms-update-overlay" component={(props) => getFormLayout(props, 'Forms: Update, Overlay', 'forms-update-overlay')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsUpdateOverlayLayout} />
      </Route>
      <Route path="forms-update-wizard" component={(props) => getFormLayout(props, 'Forms: Update, Wizard', 'forms-update-wizard')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsUpdateWizardLayout} />
      </Route>
      <Route path="forms-update-wizard-generic" component={(props) => getFormLayout(props, 'Forms: Update, Wizard - Generic', 'forms-update-wizard-generic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsUpdateWizardGenericLayout} />
      </Route>

      {/* Forms: Destroy */}
      <Route path="forms-destroy-optimistic" component={(props) => getFormLayout(props, 'Forms: Destroy, Optimistic', 'forms-destroy-optimistic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsDestroyOptimisticLayout} />
      </Route>
      <Route path="forms-destroy-overlay" component={(props) => getFormLayout(props, 'Forms: Destroy, Overlay', 'forms-destroy-overlay')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsDestroyOverlayLayout} />
      </Route>
      <Route path="forms-destroy-wizard" component={(props) => getFormLayout(props, 'Forms: Destroy, Wizard', 'forms-destroy-wizard')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsDestroyWizardLayout} />
      </Route>
      <Route path="forms-destroy-wizard-generic" component={(props) => getFormLayout(props, 'Forms: Destroy, Wizard - Generic', 'forms-destroy-wizard-generic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={FormsDestroyWizardGenericLayout} />
      </Route>

      {/* Dialogs: Create */}
      <Route path="dialogs-create-optimistic" component={(props) => getLayout(props, 'Dialogs: Create, Optimistic', 'dialogs-update-optimistic')}>
        <IndexRoute component={DialogsCreateOptimisticLayout} />
      </Route>
      <Route path="dialogs-create-overlay" component={(props) => getLayout(props, 'Dialogs: Create, Overlay', 'dialogs-update-overlay')}>
        <IndexRoute component={DialogsCreateOverlayLayout} />
      </Route>
      <Route path="dialogs-create-wizard" component={(props) => getLayout(props, 'Dialogs: Create, Wizard', 'dialogs-update-wizard')}>
        <IndexRoute component={DialogsCreateWizardLayout} />
      </Route>
      <Route path="dialogs-create-wizard-generic" component={(props) => getLayout(props, 'Dialogs: Create, Wizard - Generic', 'dialogs-update-wizard-generic')}>
        <IndexRoute component={DialogsCreateWizardGenericLayout} />
      </Route>

      {/* Dialogs: Update */}
      <Route path="dialogs-update-optimistic" component={(props) => getLayout(props, 'Dialogs: Update, Optimistic', 'dialogs-update-optimistic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsUpdateOptimisticLayout} />
      </Route>
      <Route path="dialogs-update-overlay" component={(props) => getLayout(props, 'Dialogs: Update, Overlay', 'dialogs-update-overlay')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsUpdateOverlayLayout} />
      </Route>
      <Route path="dialogs-update-wizard" component={(props) => getLayout(props, 'Dialogs: Update, Wizard', 'dialogs-update-wizard')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsUpdateWizardLayout} />
      </Route>
      <Route path="dialogs-update-wizard-generic" component={(props) => getLayout(props, 'Dialogs: Update, Wizard - Generic', 'dialogs-update-wizard-generic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsUpdateWizardGenericLayout} />
      </Route>

      {/* Dialogs: Destroy */}
      <Route path="dialogs-destroy-optimistic" component={(props) => getLayout(props, 'Dialogs: Destroy, Optimistic', 'dialogs-destroy-optimistic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsDestroyOptimisticLayout} />
      </Route>
      <Route path="dialogs-destroy-overlay" component={(props) => getLayout(props, 'Destroy: Destroy, Overlay', 'dialogs-destroy-overlay')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsDestroyOverlayLayout} />
      </Route>
      <Route path="dialogs-destroy-wizard" component={(props) => getLayout(props, 'Destroy: Destroy, Wizard', 'dialogs-destroy-wizard')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsDestroyWizardLayout} />
      </Route>
      <Route path="dialogs-destroy-wizard-generic" component={(props) => getLayout(props, 'Destroy: Destroy, Wizard - Generic', 'dialogs-destroy-wizard-generic')}>
        <IndexRoute component={EmptyView} />
        <Route path=":tweetId" component={DialogsDestroyWizardGenericLayout} />
      </Route>
    </Route>
  </Route>
);

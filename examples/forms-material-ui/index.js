/**
* This file kicks off the build process for the application.  It also attaches
* the Lore singleton to the window, so you can access it from the command line
* in case you need to play with it or want to manually kick off actions or check
* the reducer state (through `lore.actions.xyz`, `lore.reducers.xyz`,
* `lore.models.xyz`, etc.)
**/

import lore from 'lore';
import _ from 'lodash';

// Needed for using onTouchTap and removing the 300ms touch delay from mobile devices
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Hooks
import auth from 'lore-hook-auth';
import actions from 'lore-hook-actions';
import bindActions from 'lore-hook-bind-actions';
import collections from 'lore-hook-collections';
import connections from 'lore-hook-connections';
import connect from './hooks/lore-hook-connect';
import dialog from 'lore-hook-dialog';
import dialogs from 'lore-hook-dialogs-material-ui';
import forms from 'lore-hook-forms-material-ui';
import models from 'lore-hook-models';
import react from 'lore-hook-react';
import reducers from 'lore-hook-reducers';
import redux from 'lore-hook-redux';
import router from 'lore-hook-router';

// Allows you to access your lore app globally as well as from within
// the console. Remove this line if you don't want to be able to do that.
window.lore = lore;

// Summon the app!
lore.summon({
  hooks: {
    auth,
    actions,
    bindActions,
    collections,
    connections,
    connect,
    dialog,
    dialogs,
    forms,
    models,
    react,
    reducers,
    redux: _.extend(redux, {
      dependencies: ['reducers', 'auth']
    }),
    router
  }
});

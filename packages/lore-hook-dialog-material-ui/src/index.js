/* eslint no-param-reassign: "off" */

import React from 'react';
import _ from 'lodash';
import defaultConfig from './config';

export default {

  defaults: {
    dialog: defaultConfig
  },

  load: function(lore) {
    const {
      muiTheme,
      domElementId,
      buildDialogContainer,
      renderDialogToDom
    } = lore.config.dialog;

    if (!muiTheme) {
      throw new Error('Must provide a muiTheme in the config for lore-hook-dialog');
    }

    lore.dialog = {};

    lore.dialog.show = function(component, options = {}) {
      const dialog = _.isFunction(component) ? component() : component;

      if (!dialog) {
        throw new Error('Must provide a component to lore.dialog.show');
      }

      const DialogContainer = buildDialogContainer(lore, options);

      // Find the proper DOM element and mount the dialog to it
      renderDialogToDom(domElementId || options.domElementId, (
        <DialogContainer dialog={dialog} />
      ));
    }
  }

};

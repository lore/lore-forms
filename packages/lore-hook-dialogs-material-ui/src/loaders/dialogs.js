/* global __LORE_ROOT__ */

import buildDictionary from 'webpack-requiredir';

export default {

  load: function() {
    const context = require.context(`${__LORE_ROOT__}/src/dialogs`, true, /\.js$/);
    return buildDictionary(context, {
      // options
    });
  }

};

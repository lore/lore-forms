/* global __LORE_ROOT__ */

import buildDictionary from 'webpack-requiredir';

export default {

  load: function() {
    // const context = require.context(`${__LORE_ROOT__}/src/forms`, false, /\.js$/);
    // const context = require.context('../../../src/forms', false, /\.js$/);
    const context = require.context(`${__LORE_ROOT__}/src/forms`, true, /\.js$/);
    return buildDictionary(context, {
      // options
    });
  }

};

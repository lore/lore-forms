/* eslint no-param-reassign: "off" */

import connect from './connect';
import _connect from './_connect';
import _getState from './_getState';
import __Connect from './__Connect';
import find from './blueprints/find';
import byId from './blueprints/byId';
import singleton from './blueprints/singleton';
import all from './blueprints/all';
import byCid from './blueprints/byCid';
import first from './blueprints/first';

export {
  _connect as connect,
  _getState as getState,
  __Connect as Connect
};

export default {

  dependencies: ['actions'],

  defaults: {
    connect: {
      blueprints: {
        find,
        byId,
        singleton,
        all,
        byCid,
        first
      },
      reducerActionMap: {
        '*.all': {
          action: null,
          reducer: '*.byCid',
          blueprint: 'all'
        },
        '*.byCid': {
          action: null,
          reducer: '*.byCid',
          blueprint: 'byCid'
        },
        '*.byId': {
          action: '*.get',
          reducer: '*.byId',
          blueprint: 'byId'
        },
        '*.find': {
          action: '*.find',
          reducer: '*.find',
          blueprint: 'find'
        },
        '*.first': {
          action: '*.find',
          reducer: '*.find',
          blueprint: 'first'
        }
      }
    }
  },

  load: function(lore) {
    const config = lore.config.connect;
    const actions = lore.actions;
    const reducerActionMap = config.reducerActionMap;
    const blueprints = config.blueprints;

    lore.connect = connect(actions, blueprints, reducerActionMap);
  }

};

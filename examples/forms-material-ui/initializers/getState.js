import _getState from 'lore-hook-connect/es/getState';

export default function() {
  // Hack to support a lore.getState ability
  var getState = lore.getState = _getState(
    lore.actions,
    lore.config.connect.blueprints,
    lore.config.connect.reducerActionMap
  );

  lore.getState = function(stateKey, params, options) {
    var state = lore.store.getState();
    return getState(state, stateKey, params, options)
  }
};

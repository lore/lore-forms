var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;

/*
 * Blueprint for Create method
 */
module.exports = function create(params) {
  return function(dispatch) {
    var Model = lore.models.tweet;
    var model = new Model(params);

    model.save().then(function() {
      dispatch({
        type: ActionTypes.update('tweet'),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      var error = response.data;

      dispatch({
        type: ActionTypes.remove('tweet'),
        payload: payload(model, PayloadStates.ERROR_CREATING, error)
      });
    });

    return dispatch({
      type: ActionTypes.add('tweet'),
      payload: payload(model, PayloadStates.CREATING)
    });
  };
};

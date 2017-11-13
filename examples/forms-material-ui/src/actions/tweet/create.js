import { ActionTypes, PayloadStates, payload } from 'lore-utils';

/*
 * Blueprint for Create method
 */
module.exports = function create(params) {
  return function(dispatch) {
    const Model = lore.models.tweet;
    const model = new Model(params);

    setTimeout(function() {
    if (params.text.toLowerCase() === 'explode') {
      dispatch({
        type: ActionTypes.update('tweet'),
        payload: payload(model, PayloadStates.ERROR_CREATING, {
          message: "Tweet could not be saved. Please change text to something other than 'explode'."
        })
      });
    } else {
      model.save().then(function() {
        dispatch({
          type: ActionTypes.update('tweet'),
          payload: payload(model, PayloadStates.RESOLVED)
        });
      }).catch(function(response) {
        const error = response.data;

        dispatch({
          type: ActionTypes.update('tweet'),
          payload: payload(model, PayloadStates.ERROR_CREATING, error)
        });
      });
    }
    }, lore.config.actions.ajaxDelay);

    return dispatch({
      type: ActionTypes.add('tweet'),
      payload: payload(model, PayloadStates.CREATING)
    });
  };
};

import _ from 'lodash';
import { ActionTypes, PayloadStates, payload } from 'lore-utils';

/*
 * Blueprint for Destroy method
 */
export default function destroy(model) {
  return function(dispatch) {
    const Model = lore.models.tweet;
    const proxyModel = new Model(model.data);

    setTimeout(function() {
    if (model.data.text.toLowerCase() === 'fail') {
      dispatch({
        type: ActionTypes.update('tweet'),
        payload: payload(proxyModel, PayloadStates.ERROR_UPDATING, {
          message: "Tweet could not be destroyed. Please change text to something other than 'fail'."
        })
      });
    } else {
      proxyModel.destroy().then(function() {
        dispatch({
          type: ActionTypes.update('tweet'),
          payload: _.merge(model, {
            state: PayloadStates.DELETED
          })
        });
      }).catch(function(response) {
        const error = response.data;

        if (response.status === 404) {
          dispatch({
            type: ActionTypes.update('tweet'),
            payload: _.merge(model, {
              state: PayloadStates.NOT_FOUND,
              error: error
            })
          });
        } else {
          dispatch({
            type: ActionTypes.update('tweet'),
            payload: _.merge(model, {
              state: PayloadStates.ERROR_DELETING,
              error: error
            })
          });
        }
      });
    }
    }, lore.config.actions.ajaxDelay);

    return dispatch({
      type: ActionTypes.update('tweet'),
      payload: _.merge(model, {
        state: PayloadStates.DELETING
      })
    });
  };
};

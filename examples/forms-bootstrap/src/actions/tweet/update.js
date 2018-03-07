import _ from 'lodash';
import { ActionTypes, PayloadStates, payload } from 'lore-utils';

/*
 * Blueprint for Update method
 */
export default function update(model, params) {
  return function(dispatch) {
    const Model = lore.models.tweet;
    const proxyModel = new Model(model.data);
    proxyModel.set(params);

    setTimeout(function() {
    if (params.text.toLowerCase() === 'explode') {
      dispatch({
        type: ActionTypes.update('tweet'),
        payload: payload(proxyModel, PayloadStates.ERROR_UPDATING, {
          message: "Tweet could not be saved. Please change text to something other than 'explode'."
        })
      });
    } else {
      proxyModel.save().then(function() {
        dispatch({
          type: ActionTypes.update('tweet'),
          payload: _.merge(model, {
            data: proxyModel.toJSON(),
            state: PayloadStates.RESOLVED
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
              data: proxyModel.toJSON(),
              state: PayloadStates.ERROR_UPDATING,
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
        data: proxyModel.toJSON(),
        state: PayloadStates.UPDATING
      })
    });
  };
};

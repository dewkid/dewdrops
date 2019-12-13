import * as types from './actionTypes';
import * as dewdropApi from '../../api/dewdropApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCurrentDewdropSuccess(currentDewdrop) {
  return { type: types.LOAD_CURRENT_DEWDROP_SUCCESS, currentDewdrop };
}

export function loadCurrentDewdrop(id) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return dewdropApi
      .getDewdrop(id)
      .then(currentDewdrop => {
        dispatch(loadCurrentDewdropSuccess(currentDewdrop));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

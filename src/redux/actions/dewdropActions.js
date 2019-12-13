import * as types from './actionTypes';
import * as dewdropApi from '../../api/dewdropApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadDewdropsSuccess(dewdrops) {
  return { type: types.LOAD_DEWDROPS_SUCCESS, dewdrops };
}

export function createDewdropSuccess(dewdrop) {
  return { type: types.CREATE_DEWDROP_SUCCESS, dewdrop };
}

// Load dewdrops thunk
export function loadDewdrops() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return dewdropApi
      .getDewdrops()
      .then(dewdrops => {
        dispatch(loadDewdropsSuccess(dewdrops));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveDewdrop(dewdrop) {
  // eslint-disable-next-line no-unused-vars
  return function(dispatch) {
    dispatch(beginApiCall());
    return dewdropApi
      .saveDewdrop(dewdrop)
      .then(savedDewdrop => {
        dispatch(createDewdropSuccess(savedDewdrop));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

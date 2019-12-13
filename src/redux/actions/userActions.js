import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

// this is a thunk
export function loadUsers() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then(users => {
        dispatch(loadUsersSuccess(users));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

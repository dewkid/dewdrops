import * as types from './actionTypes';

export function loginUser(user) {
  return function(dispatch) {
    dispatch({
      type: types.LOGIN_USER,
      currentUser: {
        id: user.id,
        name: user.name,
        loggedIn: true
      }
    });
  };
}

export function logoutUser() {
  return function(dispatch) {
    dispatch({
      type: types.LOGOUT_USER,
      currentUser: { id: 0, name: '', loggedIn: false }
    });
  };
}

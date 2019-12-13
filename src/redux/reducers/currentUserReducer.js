import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.currentUser, action) {
  switch (action.type) {
    case types.LOGIN_USER:
    case types.LOGOUT_USER:
      return action.currentUser;
    default:
      return state; // return state untouched by default
  }
}

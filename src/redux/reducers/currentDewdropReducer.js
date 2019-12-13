import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentDewdropReducer(
  state = initialState.currentDewdrop,
  action
) {
  switch (action.type) {
    case types.LOAD_CURRENT_DEWDROP_SUCCESS:
      return action.currentDewdrop;
    default:
      return state; // return state untouched by default
  }
}

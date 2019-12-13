import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dewdropsReducer(state = initialState.dewdrops, action) {
  switch (action.type) {
    case types.LOAD_DEWDROPS_SUCCESS:
      return action.dewdrops;
    case types.CREATE_DEWDROP_SUCCESS:
      return [...state, { ...action.dewdrop }];
    default:
      return state; // return state untouched by default
  }
}

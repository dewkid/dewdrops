import { combineReducers } from 'redux';
import dewdrops from './dewdropsReducer';
import users from './userReducer';
import comments from './commentReducer';
import currentUser from './currentUserReducer';
import apiCallsInProgress from './apiStatusReducer';
import currentDewdrop from './currentDewdropReducer';

const rootReducer = combineReducers({
  dewdrops,
  comments,
  users,
  currentDewdrop,
  currentUser,
  apiCallsInProgress
});

export default rootReducer;

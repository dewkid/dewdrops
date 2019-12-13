import * as types from './actionTypes';
import * as commentApi from '../../api/commentApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}

export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment };
}

export function loadComments() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return commentApi
      .getComments()
      .then(comments => {
        dispatch(loadCommentsSuccess(comments));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadCommentsFor(dewdropid) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return commentApi
      .getCommentsFor(dewdropid)
      .then(comments => {
        dispatch(loadCommentsSuccess(comments));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveComment(comment) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return commentApi
      .saveComment(comment)
      .then(savedComment => {
        dispatch(createCommentSuccess(savedComment));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

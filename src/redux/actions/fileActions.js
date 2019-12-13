import * as types from './actionTypes';
import * as fileApi from '../../api/fileApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function saveFileSuccess(file) {
  return { type: types.UPLOAD_FILE_SUCCESS, file };
}

export function saveFile(file) {
  // eslint-disable-next-line no-unused-vars
  return function(dispatch) {
    dispatch(beginApiCall());
    return fileApi
      .saveFile(file)
      .then(savedFile => {
        dispatch(saveFileSuccess(savedFile));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

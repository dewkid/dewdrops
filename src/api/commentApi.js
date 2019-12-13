import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/comments/';

export function getComments() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getCommentsFor(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveComment(comment) {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(comment)
  })
    .then(handleResponse)
    .catch(handleError);
}

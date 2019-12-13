import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/dewdrops/';

export function getDewdrops() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getDewdrop(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

// Create or Update based on whether id is null or not
export function saveDewdrop(dewdrop) {
  return fetch(baseUrl + (dewdrop.id || ''), {
    method: dewdrop.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dewdrop)
  })
    .then(handleResponse)
    .catch(handleError);
}

import { sendRequest } from './send-request';

const BASE_URL = '/api/photos';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function create(photoData) {
  return sendRequest(BASE_URL, 'POST', photoData);
}

export function update(photoId, photoData) {
  return sendRequest(`${BASE_URL}/${photoId}`, 'PUT', photoData);
}
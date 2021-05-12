import { sendRequest } from './send-request';

const BASE_URL = '/api/photos';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function create(photoData) {
  return sendRequest(BASE_URL, 'POST', photoData, true);
}

export function update(photoId, photoData) {
  return sendRequest(`${BASE_URL}/${photoId}`, 'PUT', photoData);
}

export function deletePhoto(photoId) {
  return sendRequest(`${BASE_URL}/${photoId}`, 'DELETE');
}
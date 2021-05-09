import { sendRequest } from './send-request';

const BASE_URL = '/api/photos';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function upload(photoData) {
  return sendRequest(BASE_URL, 'POST', photoData);
}
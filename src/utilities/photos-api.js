import { sendRequest } from './send-request';
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand
} = require("@aws-sdk/client-s3");
const REGION = process.env.REGION;
const bucket = process.env.S3_BUCKET;
const BASE_URL = '/api/photos';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function upload(photoData) {
  console.log(photoData);
}
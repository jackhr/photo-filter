const Photo = require('../../models/photo');
// const {
//   S3Client,
//   PutObjectCommand,
//   CreateBucketCommand
// } = require("@aws-sdk/client-s3");
// const REGION = process.env.REGION;
// const bucket = process.env.S3_BUCKET;

module.exports = {
  getAll,
  create,
  update,
}

async function getAll(req, res) {
  const photos = await Photo.find({});
  res.json(photos);
}

async function create(req, res) {
  try {
    // req.body.user = req.user._id;
    const photo = await Photo.create(req.body);
    res.json(photo);
  } catch {
    res.status(400).json(err)
  }
}

async function update(req, res) {
  try {
    console.log('req.body');
  } catch {
    console.log('it\'s an error!')
    res.status(400).json(err)
  }
}
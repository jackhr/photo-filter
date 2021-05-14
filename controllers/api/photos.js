const Photo = require('../../models/photo');
const uuid = require('uuid');
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const BASE_URL = process.env.S3_BASE_URL;
const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;

module.exports = {
  getAll,
  create,
  update,
  delete: deletePhoto,
}

async function getAll(req, res) {
  const photos = await Photo.find({}).populate('user').exec();
  res.json(photos);
}

async function create(req, res) {
  try {
    const url = await getUploadedImageUrl(req);
    await Photo.create({
      ...req.body,
      imageURL: url,
      user: req.user._id
    });
    const photos = await Photo.find({});
    res.json(photos);
  } catch(err) {
    res.status(400).json(err)
  }
}

async function update(req, res) {
  try {
    await Photo.findOneAndUpdate(
      {user: req.user._id, _id: req.params.id},
      {name: req.body.name}
    );
      const newPhotosArray = await Photo.find({});
      res.json(newPhotosArray);
  } catch(err) {
    res.status(400).json(err);
  }
}

async function deletePhoto(req, res) {
  try {
    await Photo.findOneAndDelete(
      {user: req.user._id, _id: req.params.id}
    );
    const newPhotosArray = await Photo.find({});
    res.json(newPhotosArray);
  } catch(err) {
    res.status(400).json(err);
  }
}


/*-----Helper Functions-----*/

async function getUploadedImageUrl(req) {
  const hex = uuid.v4().slice(uuid.v4().length-6);
  const fileExtension = req.file.mimetype.match(/[/](.*)/)[1].replace('', '.');
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: hex + fileExtension,
    Body: req.file.buffer
  }
  const s3 = new S3Client({ region: REGION });
  const run = async () => {
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
  return `${BASE_URL}${BUCKET}/${uploadParams.Key}`;
}
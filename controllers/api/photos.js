const Photo = require('../../models/photo');
const uuid = require('uuid');
const Jimp = require('jimp');
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
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
    // console.log(await Jimp.read(req.file.buffer));
    // console.log(req.file.buffer);
    const AWSData = await getNewImageUrl(req.file);
    await Photo.create({
      ...req.body,
      AWSKey: AWSData.key,
      sourceURL: AWSData.url,
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
      {user: req.user._id, AWSKey: req.params.key}
    );
    deleteImage(req.params.key);
    const newPhotosArray = await Photo.find({});
    res.json(newPhotosArray);
  } catch(err) {
    res.status(400).json(err);
  }
}

/*-----Helper Functions-----*/

function generateAWSKey(photo) {
  const hex = uuid.v4().slice(uuid.v4().length-6);
  const fileExtension = photo.mimetype.match(/[/](.*)/)[1].replace('', '.');
  return hex + fileExtension;
}

async function getNewImageUrl(photo, edit=false, key) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: edit ? key : generateAWSKey(photo),
    Body: edit ? photo : photo.buffer
  }
  const s3 = new S3Client({ region: REGION });
  const run = async () => {
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log(`Successfully uploaded ${uploadParams.Key}:`, data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
  return {
    url: `${BASE_URL}${BUCKET}/${uploadParams.Key}`,
    key: uploadParams.Key,
  } 
}

async function deleteImage(key) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  }
  const s3 = new S3Client({ region: REGION });
  const run = async () => {
    try {
      await s3.send(new DeleteObjectCommand(uploadParams));
      console.log("Successfully deleted", key);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
}

async function getImage(key) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  }
  const s3 = new S3Client({ region: REGION });
  const run = async () => {
    try {
      const photo = await s3.send(new GetObjectCommand(uploadParams));
      console.log("Success", photo);
      return setTimeout(function() {return photo}, 3000);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
}
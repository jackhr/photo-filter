const Photo = require('../../models/photo');
const uuid = require('uuid');
const Jimp = require('jimp');
const getStream = require('get-stream');
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
    const AWSData = await getNewImageUrl(req.file);
    await Photo.create({
      ...req.body,
      AWSKey: AWSData.key,
      sourceURL: AWSData.url,
      user: req.user._id
    });
    const photos = await Photo.find({});
    res.json(photos);
  } catch (err) {
    res.status(400).json(err)
  }
}

async function update(req, res) {
  try {
    // Based on the button clicked on the UI, a certain helper function will run to use certain jimp methods. The resulting promise will be assigned to avariable and then passed to the getUploadedImageUrl function.
    // Need the photo key
    // Assign sourceBuffer and currentBuffer to the photo model
    const photo = await Photo.findById(req.params.id);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: req.body.key,
    }
    const s3 = new S3Client({ region: REGION });
    const AWSData = await s3.send(new GetObjectCommand(uploadParams));
    const buffer = await getStream.buffer(AWSData.Body);
    const img = await Jimp.read(buffer);
    console.log(img);

    photo.name = req.body.name;
    await photo.save();
    const newPhotosArray = await Photo.find({});
    res.json(newPhotosArray);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deletePhoto(req, res) {
  try {
    await Photo.findOneAndDelete(
      { user: req.user._id, AWSKey: req.params.key }
    );
    deleteImage(req.params.key);
    const newPhotosArray = await Photo.find({});
    res.json(newPhotosArray);
  } catch (err) {
    res.status(400).json(err);
  }
}

/*-----Helper Functions-----*/

function generateAWSKey(photo) {
  const hex = uuid.v4().slice(uuid.v4().length - 6);
  const fileExtension = photo.mimetype.match(/[/](.*)/)[1].replace('', '.');
  return hex + fileExtension;
}

async function getNewImageUrl(photo) {
  const uploadParams = {
    Bucket: BUCKET,
    Key: generateAWSKey(photo),
    Body: photo.buffer
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
  };
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
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
}
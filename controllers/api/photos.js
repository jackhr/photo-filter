const Photo = require('../../models/photo');
const uuid = require('uuid');
const Jimp = require('jimp');
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
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
    // Based on the button clicked on the UI, a certain helper function will run to use certain jimp methods. The resulting promise will be assigned to avariable and then passed to the getUploadedImageUrl function.
    // const img = await Jimp.read(req.file.buffer);
    // img.quality(60);
    //   // .resize(250, 250);
    // const newImg = await img.getBufferAsync(req.file.mimetype);
    const AWSData = await getUploadedImageUrl(req.file);
    await Photo.create({
      ...req.body,
      imageURL: AWSData.url,
      AWSKey: AWSData.key,
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

async function getUploadedImageUrl(photo) {
  const hex = uuid.v4().slice(uuid.v4().length-6);
  const fileExtension = photo.mimetype.match(/[/](.*)/)[1].replace('', '.');
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: hex + fileExtension,
    Body: photo.buffer
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
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
}
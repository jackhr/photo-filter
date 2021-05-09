const Photo = require('../../models/photo');
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand
} = require("@aws-sdk/client-s3");

module.exports = {
  create,
}

function create(req, res) {
  const REGION = "us-east-1";
  
  // Set the parameters
  const params = {
    Bucket: process.env.S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
    // Probably going to be something like req.FILES.something
    Key: "KEY", // The name of the object. For example, 'sample_upload.txt'.
    Body: "BODY" // The content of the object. For example, 'Hello world!".
  }
  
  
  // Create an Amazon Simple Storage Solution (Amazon S3) client service object.
  const s3Client = new S3Client({ region: REGION });
  
  const run = async () => {
    // Create an Amazon S3 bucket.
    try {
      const data = await s3Client.send(new CreateBucketCommand({Bucket: params.Bucket}));
      console.log(data);
      console.log("Successfully created a bucket called ", data.BucketName);
    } catch (err) {
      console.log("Error", err);
    }
    // Create an object and upload it to the Amazon S3 bucket.
    try {
      const results = await s3Client.send(new PutObjectCommand(params));
      console.log("Successfully created " + params.Key + " and uploaded it to " + params.Bucket + "/" + params.Key);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
}




const Photo = require('../../models/photo');

module.exports = {
  getAll,
  create,
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
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
  req.body.user = req.user._id;
  const photo = await Photo.create(req.body);
  res.json(photo);
}
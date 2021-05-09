const Photo = require('../../models/photo');

module.exports = {
  getAll,
}

async function getAll(req, res) {
  const photos = await Photo.find({});
  res.json(photos);
}
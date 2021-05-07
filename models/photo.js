const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  name: String,
  url: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Photo', photoSchema);
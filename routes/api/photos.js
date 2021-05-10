const express = require('express');
const router = express.Router();
const photosCtrl = require('../../controllers/api/users');

// const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/photos
router.get('/', photosCtrl.getAll);
// POST /api/photos
router.post('/', photosCtrl.create);


module.exports = router;
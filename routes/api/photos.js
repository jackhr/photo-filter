const express = require('express');
const router = express.Router();
const photosCtrl = require('../../controllers/api/photos');

// const ensureLoggedIn = require('../../config/ensureLoggedIn');

// PUT /api/photos/:id
console.log('hello');
router.put('/:id', photosCtrl.update);
// GET /api/photos
router.get('/', photosCtrl.getAll);
// POST /api/photos
router.post('/', photosCtrl.create);


module.exports = router;
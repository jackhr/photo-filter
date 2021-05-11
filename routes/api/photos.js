const express = require('express');
const router = express.Router();
const photosCtrl = require('../../controllers/api/photos');

// const ensureLoggedIn = require('../../config/ensureLoggedIn');
console.log('here in routes');
// GET /api/photos
router.get('/', photosCtrl.getAll);
// POST /api/photos
router.post('/', photosCtrl.create);
// PUT /api/photos/:id
router.put('/:id', photosCtrl.update);


module.exports = router;
const express = require('express');
const router = express.Router();
const photosCtrl = require('../../controllers/api/photos');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/photos
router.get('/', photosCtrl.getAll);
// POST /api/photos
router.post('/', ensureLoggedIn, photosCtrl.create);
// PUT /api/photos/:id
router.put('/:id', ensureLoggedIn, photosCtrl.update);
// DELETE /api/photos/:id
router.delete('/:id', ensureLoggedIn, photosCtrl.delete);

module.exports = router;
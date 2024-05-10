const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const photosCtrl = require('../controllers/photos');


router.post('/', multer, photosCtrl.postPhoto);
router.delete('/:id', photosCtrl.deletePhoto);

module.exports = router;
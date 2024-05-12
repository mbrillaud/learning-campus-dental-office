const express = require('express');
const router = express.Router();
const multerConfig = require('../middlewares/multer-config');
const photosCtrl = require('../controllers/photos');

// Utilisation du middleware Multer avec le dossier de destination pour les photos
router.post('/', multerConfig('public/images/office'), photosCtrl.postPhoto);

router.delete('/:id', photosCtrl.deletePhoto);

module.exports = router;

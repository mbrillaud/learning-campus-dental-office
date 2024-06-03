const express = require('express');
const router = express.Router();
const multerConfig = require('../middlewares/multer-config');
const photosCtrl = require('../controllers/photos');

// Utilisation du middleware Multer avec le dossier de destination pour les photos

/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: Gestion des photos pour le carousel de la page d'accueil
 */

/**
 * @swagger
 * /photos:
 *   post:
 *     summary: Télécharger une nouvelle photo pour le carousel
 *     tags: [Photos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: La photo a été téléchargée avec succès
 *       400:
 *         description: Erreur lors du téléchargement de la photo
 */
router.post('/', multerConfig('public/images/office'), photosCtrl.postPhoto);

/**
 * @swagger
 * /photos/{id}:
 *   delete:
 *     summary: Supprimer une photo par ID
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la photo
 *     responses:
 *       200:
 *         description: La photo a été supprimée avec succès
 *       404:
 *         description: Photo non trouvée
 *       400:
 *         description: Erreur lors de la suppression de la photo
 */
router.delete('/:id', photosCtrl.deletePhoto);

module.exports = router;

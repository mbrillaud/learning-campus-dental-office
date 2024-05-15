const express = require('express');
const router = express.Router();
const multerConfig = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

const newsCtrl = require('../controllers/news');

// Documentation Swagger
/**
 * @swagger
 * tags:
 *   name: News
 *   description: Endpoints pour gérer les actualités
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Récupérer toutes les actualités
 *     tags: [News]
 *     responses:
 *       '200':
 *         description: Liste des actualités récupérée avec succès
 */
router.get('/', newsCtrl.getNews);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Ajouter une nouvelle actualité
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre de l'actualité
 *               content:
 *                 type: string
 *                 description: Contenu de l'actualité
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image associée à l'actualité
 *     responses:
 *       '201':
 *         description: Actualité ajoutée avec succès
 */
router.post('/', auth, multerConfig('public/images/news'), newsCtrl.addNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Mettre à jour une actualité existante
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'actualité à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nouveau titre de l'actualité
 *               content:
 *                 type: string
 *                 description: Nouveau contenu de l'actualité
 *     responses:
 *       '200':
 *         description: Actualité mise à jour avec succès
 */
router.put('/:id', auth, newsCtrl.updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Supprimer une actualité existante
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'actualité à supprimer
 *     responses:
 *       '204':
 *         description: Actualité supprimée avec succès
 */
router.delete('/:id', auth, newsCtrl.deleteNews);

module.exports = router;

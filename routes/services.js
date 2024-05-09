const express = require('express');
const servicesCtrl = require('../controllers/services');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Opérations sur les services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du service
 *         label:
 *           type: string
 *           description: Libellé du service
 *         description:
 *           type: string
 *           description: Description du service
 *     ServiceInput:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           description: Libellé du service
 *           example: Service A
 *         description:
 *           type: string
 *           description: Description du service
 *           example: Description du service A
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Ajouter un service
 *     description: Ajoute un nouveau service.
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceInput'
 *     responses:
 *       '201':
 *         description: Service créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *   get:
 *     summary: Obtenir tous les services
 *     description: Récupère la liste de tous les services.
 *     tags: [Services]
 *     responses:
 *       '200':
 *         description: Liste de services récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */

router.post('/', auth, isAdmin, servicesCtrl.addService);
router.get('/', servicesCtrl.getServices);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Mettre à jour un service
 *     description: Met à jour un service existant.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du service à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceInput'
 *     responses:
 *       '204':
 *         description: Service mis à jour avec succès
 *       '404':
 *         description: Service non trouvé
 *   delete:
 *     summary: Supprimer un service
 *     description: Supprime un service existant.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du service à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Service supprimé avec succès
 *       '404':
 *         description: Service non trouvé
 */

router.put('/:id', auth, isAdmin, servicesCtrl.updateService);
router.delete('/:id', auth, isAdmin, servicesCtrl.deleteService);

module.exports = router;

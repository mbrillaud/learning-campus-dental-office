const express = require('express');
const schedulesCtrl = require('../controllers/schedules');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: Gestion des horaires
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Ajouter ou mettre à jour un horaire
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weekday:
 *                 type: string
 *               morningopeningtime:
 *                 type: string
 *                 format: time
 *               morningclosingtime:
 *                 type: string
 *                 format: time
 *               afternoonopeningtime:
 *                 type: string
 *                 format: time
 *               afternoonclosingtime:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: L'horaire a été ajouté ou mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Interdit (non administrateur)
 *       400:
 *         description: Requête invalide
 */
router.post('/', auth, isAdmin, schedulesCtrl.addOrUpdateSchedule);

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Obtenir tous les horaires
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: Une liste d'horaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   weekday:
 *                     type: string
 *                   morningopeningtime:
 *                     type: string
 *                     format: time
 *                   morningclosingtime:
 *                     type: string
 *                     format: time
 *                   afternoonopeningtime:
 *                     type: string
 *                     format: time
 *                   afternoonclosingtime:
 *                     type: string
 *                     format: time
 *       400:
 *         description: Requête invalide
 */
router.get('/', schedulesCtrl.getSchedules);

module.exports = router;

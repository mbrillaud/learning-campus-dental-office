const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const appointmentsCtrl = require('../controllers/appointments');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Gestion des rendez-vous
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Ajouter ou mettre à jour un rendez-vous
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: integer
 *               serviceId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Le rendez-vous a été créé ou mis à jour avec succès
 *       401:
 *         description: Non autorisé
 */
router.post('/', auth, appointmentsCtrl.addOrUpdateAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Mettre à jour un rendez-vous par ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du rendez-vous
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: integer
 *               serviceId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Le rendez-vous a été mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Rendez-vous non trouvé
 */
router.put('/:id', auth, appointmentsCtrl.addOrUpdateAppointment);

module.exports = router;

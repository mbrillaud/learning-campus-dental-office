const express = require('express');
const usersCtrl = require('../controllers/users');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Opérations liées à l'authentification des utilisateurs
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *         description: Prénom de l'utilisateur
 *       lastName:
 *         type: string
 *         description: Nom de famille de l'utilisateur
 *       email:
 *         type: string
 *         format: email
 *         description: Adresse e-mail de l'utilisateur
 *       phone:
 *         type: string
 *         description: Numéro de téléphone de l'utilisateur
 *       password:
 *         type: string
 *         description: Mot de passe de l'utilisateur
 *       service:
 *         type: string
 *         description: Service de l'utilisateur (optionnel)
 *       status:
 *         type: string
 *         description: Statut de l'utilisateur (optionnel)
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: 
 *       - Auth
 *     summary: Inscription utilisateur
 *     description: Permet à un utilisateur de s'inscrire en fournissant des informations de base.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Informations de l'utilisateur pour l'inscription
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Utilisateur inscrit avec succès
 *       400:
 *         description: Requête invalide, vérifiez les paramètres fournis
 *       409:
 *         description: Un utilisateur avec cette adresse e-mail ou ce numéro de téléphone existe déjà
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Connexion utilisateur
 *     description: Permet à un utilisateur de se connecter en fournissant des identifiants.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Identifiants de l'utilisateur pour la connexion
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: Adresse e-mail de l'utilisateur
 *             password:
 *               type: string
 *               description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie, jeton d'authentification généré
 *       400:
 *         description: Requête invalide, vérifiez les paramètres fournis
 *       401:
 *         description: Identifiants invalides, échec de la connexion
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags:
 *       - Auth
 *     summary: Mise à jour d'un utilisateur
 *     description: Met à jour les informations d'un utilisateur existant.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur à mettre à jour
 *         required: true
 *         type: string
 *       - in: body
 *         name: user
 *         description: Informations mises à jour de l'utilisateur
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Requête invalide, vérifiez les paramètres fournis
 *       404:
 *         description: Utilisateur non trouvé
 */

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.put('/:id', auth, isAdmin, usersCtrl.updateUser);

module.exports = router;

const express = require('express');
const usersCtrl = require('../controllers/users');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *         description: User's first name
 *       lastName:
 *         type: string
 *         description: User's last name
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address
 *       phone:
 *         type: string
 *         description: User's phone number
 *       password:
 *         type: string
 *         description: User's password
 *       service:
 *         type: string
 *         description: User's service (optional)
 *       status:
 *         type: string
 *         description: User's status (optional)
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Allows a user to sign up by providing basic information.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User information for signup
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Invalid request, check the provided parameters
 *       409:
 *         description: User with this email address or phone number already exists
 */

router.post('/signup', usersCtrl.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in by providing credentials.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials for login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: User's email address
 *             password:
 *               type: string
 *               description: User's password
 *     responses:
 *       200:
 *         description: Login successful, authentication token generated
 *       400:
 *         description: Invalid request, check the provided parameters
 *       401:
 *         description: Invalid credentials, login failed
 */

router.post('/login', usersCtrl.login);

module.exports = router;

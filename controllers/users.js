const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Inscription d'un nouvel utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.signup = (req, res, next) => {
    data = req.body;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            data.password = hash;
            const user = new User(data);
            user.save()
                .then(() => {
                    res.status(201).json({message: 'User has been created'});
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

/**
 * Connexion d'un utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            const loginErrorMessage = 'Wrong email or password';
            if (user === null) {
                res.status(401).json({ message: loginErrorMessage });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: loginErrorMessage });
                        } else {
                            const token = jwt.sign(
                                {
                                    userId: user.id,
                                    userRole: user.role
                                },
                                process.env.TOKEN_KEY,
                                { expiresIn: '24h' }
                            );
                            res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
                            res.set('Location', '/');
                            res.status(302).json({message: 'logged in successfully'});
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Déconnexion d'un utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.logout = (req, res) => {
    res.clearCookie('token'); // Supprime le cookie nommé 'token'
    res.redirect('/'); // Redirige vers une page de déconnexion réussie
};
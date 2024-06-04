const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Crée un token JWT et le stocke dans un cookie.
 * @param {Object} user - L'utilisateur pour lequel générer le token.
 * @param {Object} res - La réponse HTTP.
 */
function createAndSetToken(user, res) {
    const token = jwt.sign(
        {
            userId: user.id,
            userRole: user.role
        },
        process.env.TOKEN_KEY,
        { expiresIn: '24h' }
    );
    res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
}

/**
 * Inscription d'un nouvel utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = new User(req.body);
        await user.save();
        createAndSetToken(user, res);
        res.set('Location', '/');
        res.status(302).json({ message: 'User has been created and logged in successfully.' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Connexion d'un utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        const loginErrorMessage = 'Wrong email or password';
        if (user === null) {
            res.status(401).json({ message: loginErrorMessage });
        } else {
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (!valid) {
                res.status(401).json({ message: loginErrorMessage });
            } else {
                createAndSetToken(user, res);
                res.set('Location', '/');
                res.status(302).json({ message: 'logged in successfully' });
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Déconnexion d'un utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Check if there are any differences between the request data and the user data in the database
        const isDifferent = Object.keys(req.body).some(key => req.body[key] !== user[key]);
        if (!isDifferent) {
            res.status(200).json({ message: 'Aucune modification à effectuer', type: 'no_change' });
            return;
        }
        const updatedUser = await user.update(req.body);
        res.status(200).json({ updatedUser, message: 'Utilisateur mis à jour avec succès', type: 'updated' });
    } catch (error) {
        res.status(500).json({ error });
    }
}


exports.renderUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('bo/users.njk', { users: users });
    } catch (error) {
        res.status(500).json({ error, message: 'Erreur lors de la récupération des utilisateurs' });
    }
}
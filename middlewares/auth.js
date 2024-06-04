const jwt = require('jsonwebtoken');

/**
 * Middleware qui vérifie si l'utilisateur est authentifié. Sinon, renvoie une vue de connexion.
 * 
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @param {Function} next - La fonction de rappel pour passer au middleware suivant.
 * @returns {void}
 */
module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const userId = jwt.verify(token, process.env.TOKEN_KEY).userId;
        const userRole = jwt.verify(token, process.env.TOKEN_KEY).userRole;

        req.auth = {
            userId: userId,
            userRole: userRole
        };
        next();
    } catch(error) {
        res.render('login.njk');
    }
};
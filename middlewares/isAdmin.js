/**
 * Middleware pour vérifier si l'utilisateur est un administrateur.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @param {Function} next - La fonction du prochain middleware.
 * @returns {void}
 */
module.exports = (req, res, next) => {
    if (req.auth.userRole === 'admin') {
        return next();
    }
    res.status(403).json({ error: 'Unauthorized access' });
};
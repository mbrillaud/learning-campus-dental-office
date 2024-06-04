const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier le statut de l'utilisateur.
 * 
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @param {Function} next - La fonction de rappel pour passer au middleware suivant.
 * @returns {void}
 */
module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res.locals.isAuthenticated = false;
            next();
        } else {
            const userId = jwt.verify(token, process.env.TOKEN_KEY).userId;
            if(!userId) {
                res.locals.isAuthenticated = false;
                next();
            } else {
                const userRole = jwt.verify(token, process.env.TOKEN_KEY).userRole;
                const userFirstName = jwt.verify(token, process.env.TOKEN_KEY).userFirstName;
                const userLastName = jwt.verify(token, process.env.TOKEN_KEY).userLastName;

                res.locals.isAuthenticated = true;
                res.locals.userFirstName = userFirstName;
                res.locals.userLastName = userLastName;
                if(userRole === "admin") {
                    res.locals.isAdmin = true;
                }
                next();
            }
        }
    } catch(error) {
        res.status(401).json({error});
    }
};

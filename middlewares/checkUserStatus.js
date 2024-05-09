const jwt = require('jsonwebtoken');
//Permet d'envoyer des variables d'environnement pour les vues pour afficher certains contenu aux admins ou aux utilisateurs connectés
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
                res.locals.isAuthenticated = true;
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

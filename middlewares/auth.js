const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if(!req.cookies.token && req.path === '/bo') {
            res.redirect('/login');
        }
        const token = req.cookies.token;
        const userId = jwt.verify(token, process.env.TOKEN_KEY).userId;
        const userRole = jwt.verify(token, process.env.TOKEN_KEY).userRole;

        req.auth = {
            userId: userId,
            userRole: userRole
        };
        next();
    } catch(error) {
        res.status(401).json({error});
    }
};
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if(!req.cookies.token && req.path === '/bo') {
            res.redirect('/login');
        }
        const token = req.cookies.token;
        const userId = jwt.verify(token, process.env.TOKEN_KEY).userId;
        const userStatus = jwt.verify(token, process.env.TOKEN_KEY).userStatus;

        req.auth = {
            userId: userId,
            userStatus: userStatus
        };
        next();
    } catch(error) {
        res.status(401).json({error});
    }
};
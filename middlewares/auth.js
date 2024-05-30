const jwt = require('jsonwebtoken');

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
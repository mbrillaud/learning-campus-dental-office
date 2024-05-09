module.exports = (req, res, next) => {
    if (req.auth.userRole === 'admin') {
        return next();
    }
    res.status(403).json({ error: 'Unauthorized access' });
};
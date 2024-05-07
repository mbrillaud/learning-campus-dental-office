const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('res.locals', res.locals);
    res.render('./index.njk', {
        isAuthenticated: res.locals.isAuthenticated,
        isAdmin: res.locals.isAdmin
    });
});
router.get('/bo', auth, function(req, res) {
    res.render('./bo.njk');
});
router.get('/login', (req, res) => {
    res.render('./login.njk');
});
router.get('/signup', (req, res) => {
    res.render('./signup.njk');
});
router.get('/news', (req, res) => {
    res.render('./news.njk');
});
router.get('/appointment', (req, res) => {
    res.render('./appointment.njk');
});
router.get('/services', (req, res) => {
    res.render('./services.njk');
});

module.exports = router;
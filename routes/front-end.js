const express = require('express');
const auth = require('../middlewares/auth');
const servicesCtrl = require('../controllers/services');
const router = express.Router();

const { logout } = require('../controllers/users');

router.get('/', (req, res) => {
    console.log('res.locals', res.locals);
    res.render('./index.njk', {
        isAuthenticated: res.locals.isAuthenticated,
        isAdmin: res.locals.isAdmin
    });
});
router.get('/bo', auth, function(req, res) {
    res.render('./bo/index.njk');
});
router.get('/bo/schedules', auth, function(req, res) {
    res.render('./bo/schedules.njk');
});
router.get('/bo/services', auth, servicesCtrl.renderServicesBO);
router.get('/login', (req, res) => {
    res.render('./login.njk');
});
router.get('/signup', (req, res) => {
    res.render('./signup.njk');
});

router.get('/logout', logout);

router.get('/news', (req, res) => {
    res.render('./news.njk');
});
router.get('/appointment', (req, res) => {
    res.render('./appointment.njk');
});
router.get('/services', servicesCtrl.renderServices);

module.exports = router;
const express = require('express');
const auth = require('../middlewares/auth');
const servicesCtrl = require('../controllers/services');
const indexCtrl = require('../controllers/index');
const photosCtrl = require('../controllers/photos');
const newsCtrl = require('../controllers/news');
const router = express.Router();


const { logout } = require('../controllers/users');

router.get('/', indexCtrl.renderIndex);
router.get('/bo', auth, function(req, res) {
    res.render('./bo/index.njk');
});

router.get('/bo/schedules', auth, function(req, res) {
    res.render('./bo/schedules.njk');
});

router.get('/bo/services', auth, servicesCtrl.renderServicesBO);

router.get('/bo/news', auth, newsCtrl.renderNewsBO);

router.get('/bo/photos', auth, photosCtrl.renderPhotos);

router.get('/bo/appointments', auth, function(req, res) {
    res.render('./bo/appointments.njk');
});

router.get('/login', (req, res) => {
    res.render('./login.njk');
});

router.get('/signup', (req, res) => {
    res.render('./signup.njk');
});

router.get('/logout', logout);

router.get('/news', newsCtrl.renderNews);
router.get('/news/:id', newsCtrl.renderSingleNews);

router.get('/appointment', (req, res) => {
    res.render('./appointment.njk');
});
router.get('/services', servicesCtrl.renderServices);





module.exports = router;
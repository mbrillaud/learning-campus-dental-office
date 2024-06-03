const express = require('express');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const servicesCtrl = require('../controllers/services');
const indexCtrl = require('../controllers/index');
const photosCtrl = require('../controllers/photos');
const newsCtrl = require('../controllers/news');
const usersCtrl = require('../controllers/users');
const appointmentsCtrl = require('../controllers/appointments');
const router = express.Router();


const { logout } = require('../controllers/users');

router.get('/', indexCtrl.renderIndex);
router.get('/bo', auth, isAdmin, function(req, res) {
    res.render('./bo/index.njk');
});

router.get('/bo/schedules', auth, isAdmin, function(req, res) {
    res.render('./bo/schedules.njk');
});

router.get('/bo/services', auth, isAdmin, servicesCtrl.renderServicesBO);

router.get('/bo/news', auth, isAdmin, newsCtrl.renderNewsBO);

router.get('/bo/photos', auth, isAdmin, photosCtrl.renderPhotos);

router.get('/bo/users', auth, isAdmin, usersCtrl.renderUsers);

router.get('/bo/appointments', auth, isAdmin, appointmentsCtrl.renderAppointmentsBO);

router.get('/login', (req, res) => {
    res.render('./login.njk');
});

router.get('/signup', (req, res) => {
    res.render('./signup.njk');
});

router.get('/logout', logout);

router.get('/news', newsCtrl.renderNews);
router.get('/news/:id', newsCtrl.renderSingleNews);

router.get('/appointment', auth, appointmentsCtrl.renderAppointmentsForm);
router.get('/services', servicesCtrl.renderServices);

module.exports = router;
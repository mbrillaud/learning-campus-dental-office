const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const appointmentsCtrl = require('../controllers/appointments');

router.get('/slots', auth, appointmentsCtrl.getAvailableSlots);

module.exports = router;
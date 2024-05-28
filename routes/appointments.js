const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const appointmentsCtrl = require('../controllers/appointments');

router.post('/', auth, appointmentsCtrl.addOrUpdateAppointment);
router.put('/:id', auth, appointmentsCtrl.addOrUpdateAppointment);

module.exports = router;
const express = require('express');
const schedulesCtrl = require('../controllers/schedules');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.post('/', auth, isAdmin, schedulesCtrl.addOrUpdateSchedule);
router.get('/', schedulesCtrl.getSchedules);

module.exports = router;

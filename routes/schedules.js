const express = require('express');
const schedulesCtrl = require('../controllers/schedules');

const router = express.Router();

router.post('/', schedulesCtrl.addOrUpdateSchedule);
router.get('/', schedulesCtrl.getSchedules);

module.exports = router;

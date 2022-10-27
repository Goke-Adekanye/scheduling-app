const express = require('express');

const router = express.Router();
const { postSchedule, getSchedule } = require('../controllers/schedule');

router.route('/post-schedule').post(postSchedule);
router.route('/get-schedule/:active_date').get(getSchedule);

module.exports = router;

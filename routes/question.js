const express = require('express');

const { getQuestions, getTodayQuestion } = require('../controllers/question');

const router = express.Router();

router.route('/').get(getQuestions);

router.route('/today').get(getTodayQuestion);

module.exports = router;

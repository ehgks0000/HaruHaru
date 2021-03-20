const express = require('express');

const { getQuestions, getTodayQuestion } = require('../controllers/question');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getQuestions);

router.route('/today').get(getTodayQuestion);

module.exports = router;

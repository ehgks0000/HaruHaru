const express = require('express');

const router = express.Router();

const {
  getAnswers,
  getTodayAnswer,
  getMyAnswers,
  createAnswer,
  createLike,
} = require('../controllers/answer');

router.route('/').get(getAnswers).post(createAnswer);
router.route('/today').get(getTodayAnswer);
router.route('/like').get(createLike);

module.exports = router;

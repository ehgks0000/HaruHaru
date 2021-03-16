const Question = require('../models/question');
const Question_today = require('../models/question_scheduler');

exports.getQuestions = async (req, res) => {
  const questions = await Question.findAll();
  console.log('전체 질문지 검색');
  return res.json({ questions });
};

// 날짜 별 검색
exports.getTodayQuestion = async (req, res) => {
  //
  //   let count = await Question_today.findOne({ where: { id: 1 } });

  const today_question = await Question.findOne({
    where: { id: globalThis.question_count },
    // where: { id: count.question_count },
  });

  return res.json({ today_question });
  //   return res.send('테스트중');
};

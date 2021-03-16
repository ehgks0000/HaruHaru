const Answer = require('../models/answer');
const Question = require('../models/question');

//전체 답변
exports.getAnswers = async (req, res) => {
  const answers = await Answer.findAll();
  console.log('전체 답변 검색');
  return res.json({ answers });
};
//오늘의 질문의 전체 답변 보기
exports.getTodayAnswer = async (req, res) => {
  const today_answer = await Answer.findOne({
    QuestionId: globalThis.question_count,
  });
  return res.json({ today_answer });
};
//내 답변 전체 보기
exports.getMyAnswers = async (req, res) => {
  const answers = await Answer.findAll();
  console.log('전체 답변 검색');
  return res.json({ answers });
};
//내 답변 만들기
//오늘의 질문에서 받아온 id 값
exports.createAnswer = async (req, res) => {
  //미들웨어 auth 로그인한 유저
  //const UserId = req.user;
  const { content, emotion } = req.body;

  //   const today_question = await Question.findOne({
  //     where: { id: globalThis.question_count },
  //   });
  const answer = await Answer.create({
    content: content,
    emotion: emotion,
    QuestionId: globalThis.question_count,
    // UserId,
  });

  console.log(answer);
  return res.json({ answer });
};

exports.createLike = async (req, res) => {
  // 로그인된 유저(미들웨어) = req.user
  const answer = await Answer.findOne({
    where: { id: globalThis.question_count },
  });
  if (!answer) {
    return res.status(403).send('answer이 존재하지 않습니다');
  }
  await answer.addLikers(req.user.id);
  return res.json({ AnswerId: answer.id, UserId: req.user.id });
};

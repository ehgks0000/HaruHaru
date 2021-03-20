const schedule = require('node-schedule');
const question_scheduler = require('../models/question_scheduler');

const job = async () => {
  //   global.obj2 = count.question_count || 0;

  console.log('스케줄러 시작 ');
  // 초 분 시 일 월 요일 연도
  // 0 0 0 * * ?
  // */5 * * * * *

  let count = await question_scheduler.findOne({ where: { id: 1 } });
  globalThis.question_count = count.question_count;

  const j = schedule.scheduleJob('0 0 0 * * ?', async function () {
    globalThis.question_count += 1;
    count.question_count += 1;

    await count.save();
  });
};
module.exports = job;

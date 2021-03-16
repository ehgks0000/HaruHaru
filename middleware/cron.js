const schedule = require('node-schedule');
const question_scheduler = require('../models/question_scheduler');

const job = async () => {
  //   global.obj2 = count.question_count || 0;

  console.log('스케줄러 시작 ');
  // 초 분 시 일 월 요일 연도
  // 0 0 0 * * ?
  globalThis.question_count = 1;
  // */5 * * * * *
  const j = schedule.scheduleJob('0 0 0 * * ?', async function () {
    let count = await question_scheduler.findOne({ where: { id: 1 } });

    // let count_t = count.question_count + 1;
    question_scheduler
      .update(
        { question_count: count.question_count + 1 },
        { where: { id: 1 } }
      )
      .then((e) => {
        console.log(e);
        console.log('지남');
      })
      .catch((e) => {
        console.error(e);
      });

    globalThis.question_count = count + 1;

    // if (global.obj2 === 2000) {
    //   console.log('스케쥴러 중단');
    //   j.cancel();
    // }
  });
};
module.exports = job;

const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

// const date = new Date(utc + KR_TIME_DIFF);
const date = new Date(utc + KR_TIME_DIFF).getDay();
// const date = new Date(utc + KR_TIME_DIFF).getHours();
// const date = Date.now();

console.log(date);

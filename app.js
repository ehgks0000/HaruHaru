const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const passportConfig = require('./passport');

const dotenv = require('dotenv');
const morgan = require('morgan');
// const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const db = require('./models');
const questionRoute = require('./routes/question');
const userRoute = require('./routes/user');
const answerRoute = require('./routes/answer');

const job = require('./middleware/cron');

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결 성공');
  })
  .catch((e) => {
    console.log('db연결 실패');
    console.error(e);
  });

job();

// 안드로이드 통신은 cors 불필요
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: 'localhost', // 나중에 프런트 주소 입력
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && 'localhost', //프론트 URI
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// passportConfig();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/questions', questionRoute);
app.use('/users', userRoute);
app.use('/answers', answerRoute);

//error handling
app.use((err, req, res, next) => {
  console.log('에러');
  return res.status(500).json({ err: err.toString() });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('서버 실행 중!', port, process.env.NODE_ENV);
});

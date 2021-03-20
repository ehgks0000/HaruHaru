const express = require('express');
const router = express.Router();
const localPassport = require('../passport/localPassport');
const googlePassport = require('../passport/googlePassport');
const kakaoPassport = require('../passport/kakaoPassport');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

const passwordRegex = /^[a-zA-Z0-9]{6,10}$/;
global.socialUser = '';
global.changeUser = '';
global.checkAuthNum = 0;

const request = require('request');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

// 비밀번호 찾기
router.get('/password/find', (req, res) => {});

// 비밀번호 찾기 -> 변경 버튼
router.post('/password/find', async (req, res) => {
  try {
    const user = await User.findOne({ phone_number: req.body.phone_number });

    if (!user) {
      res.json({
        findId: false,
      });
    } else {
      changeUser = user;
      res.redirect('/password/change');
    }
  } catch (error) {
    res.send(error);
  }
});

// 비밀번호 변경
router.get('/password/change', (req, res) => {});

// 비밀번호 변경 -> 확인 버튼
router.post('/password/change', async (req, res) => {
  try {
    await User.update(
      { password: req.body.password },
      { where: { phone_number: changeUser.phone_number } }
    );
  } catch (error) {
    res.send(error);
  }

  // res.redirect("/main");
});

// 회원가입
router.get('/register', (req, res) => {
  // redirect("/register");
  res.redirect('/');
});

// 회원가입 -> 가입 버튼
router.post('/register', isNotLoggedIn, async (req, res) => {
  if (!passwordRegex.test(req.body.password)) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  }

  // 인증번호 틀리면 가입 X
  if (req.body.authNum == checkAuthNum) {
    // 비밀번호 규칙 틀리면 가입 X
    if (!passwordRegex.test(req.body.password)) {
    } else {
    }
  }

  try {
    await User.create({
      nickname: req.body.nickname,
      phone_number: req.body.phone_number,
      password: bcrypt.hashSync(req.body.password, 10),
    });
  } catch (error) {
    res.send(error);
  }

  try {
    if (socialUser !== '') {
      await User.update(
        { provider_id: socialUser.id },
        { where: { nickname: req.body.nickname } }
      );
    }
  } catch (error) {
    res.send(error);
  }

  res.redirect('/');
});

function isValid() {}

// 로컬 로그인
// router.get("/login/local", (req, res))

// 구글 로그인(인증)
router.get(
  '/login/google',
  isNotLoggedIn,
  googlePassport.authenticate('google', { scope: ['profile'] })
);
// router.get("/login/google/callback", googlePassport.authenticate('google', { failureRedirect: '/login' }),
router.get(
  '/login/google/callback',
  googlePassport.authenticate('google'),
  authSuccess
);

// 카카오 로그인(인증)
router.get(
  '/login/kakao',
  kakaoPassport.authenticate('kakao', { scope: ['profile'] })
);
router.get(
  '/login/kakao/callback',
  kakaoPassport.authenticate('kakao'),
  authSuccess
);

// 로그아웃
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

async function authSuccess(req, res) {
  // 소셜로그인일때 회원가입으로 넘어가게하려고

  // const user = await User.findOne({
  //   where: {
  //     provider_id: socialUser.id,
  //   },
  // });
  console.log(req.user);

  if (req.user) {
    // redirect("/main");
    res.redirect('/');
  } else {
    // redirect("/register");
    res.redirect('/');
  }
  // res.redirect("/register");
}

// sms 본인인증
router.post('/smsauth', (req, res) => {
  const phone = req.body.receiver;
  const accessKey = '7WP2JCYitFTIyxqA5fRu';
  const secretKey = 'bxaNbCDVkeUHMeNuvaViqQVNg4ebUY3vYdN9HDUl';
  const serviceID = 'ncp:sms:kr:260821024069:authentication';
  const myphone = '01041028844';
  const randomNum = Math.floor(Math.random() * 1000000);
  var resultCode = 0;
  checkAuthNum = randomNum;

  // 시그니처 생성
  const space = ' ';
  const newLine = '\n';
  const method = 'POST';
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceID}/messages`;
  const urlsub = `/sms/v2/services/${serviceID}/messages`;
  const timestamp = Date.now().toString();

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(urlsub);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  request(
    {
      method: method,
      json: true,
      uri: url,
      headers: {
        'Contenc-type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-apigw-signature-v2': signature,
      },
      body: {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: myphone,
        content: `인증번호는 [${randomNum}] 입니다.`,
        messages: [
          {
            to: `${phone}`,
          },
        ],
      },
    },
    function (err, res, html) {
      if (err) res.send(err);
    }
  );
  res.json({
    receiverSuccess: true,
    checkAuthNum: randomNum,
  });
});

module.exports = router;

const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

passport.use(
  new KakaoStrategy(
    {
      clientID: "40f49416515cac34fc348fdea7bc9411",
      callbackURL: "/users/login/kakao/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, user, done) => {
      socialUser = user;
      done(null, user);
    }
  )
);

module.exports = passport;

const passport = require("passport");
const { User } = require("../models");
const local = require("./localPassport");
const googleLogin = require("./googlePassport");
const kakaoLogin = require("./kakaoPassport");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("CheckCheck@@@@@@@@@@@@@@@@@@@@@@@");

    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
  googleLogin();
  kakaoLogin();
};

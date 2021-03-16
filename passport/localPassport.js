const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "phone_number",
      passwordField: "password",
    },
    async function (phone_number, password, done) {
      try {
        const user = await User.findOne({
          where: { phone_number: phone_number },
        });
        if (!user) {
          return done(null, false, { reason: "존재하지 않는 번호입니다." });
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          return done(null, user);
        }
        return done(null, false, { reason: "비밀번호가 틀렸습니다." });
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

module.exports = passport;

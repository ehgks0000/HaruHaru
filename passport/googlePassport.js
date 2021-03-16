const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  console.log("SerializeUser @@@@@@@@@@@@@@@@@@@@@@@");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("DeserializeUser @@@@@@@@@@@@@@@@@@@@@@@");
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "313563995893-uljlfqks7otm2d41l5ttso5fm55n9i9j.apps.googleusercontent.com",
      clientSecret: "7rHKnzSL3QSdrs3WxaDfimup",
      callbackURL: "/users/login/google/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, user, done) => {
      // console.log(user._json);
      socialUser = user;
      done(null, user);
    }
  )
);

module.exports = passport;

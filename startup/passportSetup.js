const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "value", passReqToCallback: true },
      async (req, value, password, done) => {
        await User.findOne({ $or: [{ email: value }, { username: value }] })
          .then(async (user) => {
            if (!user)
              return done(
                null,
                false,
                req.flash("error-message", "Incorrect email or password")
              );
            if (user.verified !== true)
              return done(
                null,
                false,
                req.flash(
                  "error-message",
                  "Sorry you have not verified your account, please check your email for the verification link."
                )
              );
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch)
              return done(
                null,
                false,
                req.flash("error-message", "Incorrect email or password")
              );
            return done(
              null,
              user,
              req.flash("success-message", "Login successful")
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

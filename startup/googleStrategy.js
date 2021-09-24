const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const CLIENT_ID =
    "194728216676-ipo3a9gem9g78s2a44nvv5u1gbdbi92i.apps.googleusercontent.com";
const CLIENT_SECRET = "9iSyNqSW9fdLlkSt_XoVdlZz";

module.exports = () => {
    passport.use(
        new GoogleStrategy({
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: "http://localhost:7000/auth/google/waawsocial",
                userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
            },
            function(accessToken, refreshToken, profile, cb) {
                let avatar = Array.from(profile._json.name);
                User.findOrCreate({
                        googleId: profile.id,
                        email: profile._json.email,
                        name: profile._json.name,
                        userImage: profile._json.picture,
                        initials: (avatar[0] + avatar[1]).toUpperCase()
                    },
                    function(err, user) {
                        return cb(err, user);
                    }
                );
            }
        )
    );
};
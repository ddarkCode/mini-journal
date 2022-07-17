const { Strategy } = require('passport-google-oauth20');
const passport = require('passport');
const debug = require('debug')('app:googleStrategy');

const User = require('../../model/userModel');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = function googleStrategy() {
  passport.use(
    new Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/verify',
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate(
          { googleId: profile.id, googleProfile: profile },
          (err, user) => {
            cb(err, user);
          }
        );
      }
    )
  );
};

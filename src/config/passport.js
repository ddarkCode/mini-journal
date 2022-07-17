const passport = require('passport');
const debug = require('debug')('app:passport');

const User = require('../model/userModel');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => {
      done(err, user);
    });
  });

  require('./strategies/localStrategy')();
  require('./strategies/googleStrategy')();
};

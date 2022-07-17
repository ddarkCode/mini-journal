// const { Strategy } = require('passport-local');
const passport = require('passport');
const User = require('../../model/userModel');
module.exports = function localStrategy() {
  passport.use(User.createStrategy());
  // passport.use(
  //   new Strategy(
  //     {
  //       usernameField: 'username',
  //       passwordField: 'password',
  //     },
  //     (username, password, done) => {
  //       User.findOne({ username }, (err, user) => {
  //         if (err) {
  //           debug(err);
  //         }
  //         if (!user) {
  //           done(null, false);
  //         } else if (user.password !== password) {
  //           done(nul, false);
  //         } else {
  //           done(null, user);
  //         }
  //       });
  //     }
  //   )
  // );
};

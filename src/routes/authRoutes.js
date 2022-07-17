const { Router } = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const User = require('../model/userModel');

function router() {
  const authRouter = Router();

  authRouter
    .route('/register')
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/api/journals');
      } else {
        res.render('register', { user: null });
      }
    })
    .post((req, res) => {
      const { username, password } = req.body;

      User.register({ username }, password, (err, user) => {
        if (err) {
          console.log(err);
          res.redirect('/auth/register');
        } else {
          passport.authenticate('local')(req, res, () => {
            res.redirect('/api/journals');
          });
        }
      });

      // const newUser = new User({
      //   username,
      //   password,
      // });

      // newUser.save((err, savedUser) => {
      //   if (err) {
      //     debug(err);
      //   } else {
      //     req.login(savedUser, (err) => {
      //       if (err) {
      //         res.json(err);
      //       } else {
      //         res.redirect('/api/journals');
      //       }
      //     });
      //   }
      // });
    });

  authRouter
    .route('/login')
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/api/journals');
      } else {
        res.render('login', { user: null });
      }
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/api/journals',
        failureRedirect: '/auth/login',
      })
    );

  authRouter
    .route('/google')
    .get(passport.authenticate('google', { scope: ['profile'] }));
  authRouter
    .route('/google/verify')
    .get(
      passport.authenticate('google', { failureRedirect: '/auth/login' }),
      (req, res) => {
        res.redirect('/api/journals');
      }
    );

  return authRouter;
}

module.exports = router;

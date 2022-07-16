const { Router } = require('express');
const debug = require('debug')('app:journalRoutes');

const { Journal } = require('../model/journalModel');
const User = require('../model/userModel');
const today = require('../utils/date');

function router() {
  const journalRouter = Router();
  journalRouter
    .route('/journals')
    .all((req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect('/auth/login');
      }
    })
    .get((req, res) => {
      User.findById(req.user._id, (err, foundUser) => {
        if (err) {
          debug(err);
          return res.redirect('/');
        } else {
          return res.status(200).render('journals', {
            journals: foundUser.journals,
            user: req.user,
          });
        }
      });
    })
    .post((req, res) => {
      const { content, title } = req.body;
      const newJournal = new Journal({
        title,
        date: today(),
        content,
      });
      newJournal.save((err, savedJournal) => {
        if (err) {
          debug(err);
        } else {
          User.findById(req.user._id, (err, foundUser) => {
            if (err) {
              debug(err);
            } else {
              foundUser.journals.push(savedJournal);
              foundUser.save((err) => {
                if (err) {
                  debug(err);
                } else {
                  res.redirect('/api/journals');
                }
              });
            }
          });
        }
      });
    });
  journalRouter.route('/journals/:journalId').get((req, res) => {
    const { journalId } = req.params;
    Journal.findById(journalId, (err, foundJournal) => {
      if (err) {
        debug(err);
      } else {
        res.render('journal', {
          user: req.user,
          journal: foundJournal,
        });
      }
    });
  });
  journalRouter.route('/journals/compose').get((req, res) => {
    res.render('compose', {
      user: req.user,
    });
  });
  return journalRouter;
}

module.exports = router;

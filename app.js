require('dotenv').config();
const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const ejs = require('ejs');
const { connect } = require('mongoose');
const session = require('express-session');

const app = express();
const { PORT, MONGO_URL, SESSION_SECRET } = process.env;
const startingContent = `What do Albert Einstein, Marie Curie and Leonardo da Vinci all have in common? Each of these famous figures kept a journal or diary to record their experiences, thoughts, or feelings.
  Expressive writing through journaling can be a powerful way to process stress, trauma, and different emotions.
  `;
const contactContent = 'Email: royal.ugoh@gmail.com';

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

connect(MONGO_URL, {}, (err) => {
  if (err) {
    debug('Error: ', err);
  } else {
    debug('Database connected successfully.');
  }
});

require('./src/config/passport')(app);

const journalRouter = require('./src/routes/journalRoutes')();
const authRouter = require('./src/routes/authRoutes')();

app.use('/auth', authRouter);
app.use('/api', journalRouter);

app.get('/', (req, res) => {
  res.render('index', {
    user: req.user || null,
    startingContent,
    homeImg:
      'https://images.unsplash.com/photo-1581284943246-0eb528155992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  });
});

app.get('/compose', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('compose', {
      user: req.user,
    });
  } else {
    res.redirect('/auth/login');
  }
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    user: req.user || null,
    contactContent,
  });
});

app.listen(PORT, () => debug(`Server running on port ${chalk.green(PORT)}`));

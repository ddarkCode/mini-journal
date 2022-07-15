require('dotenv').config();
const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const ejs = require('ejs');

const app = express();
const { PORT } = process.env;
const startingContent = `What do Albert Einstein, Marie Curie and Leonardo da Vinci all have in common? Each of these famous figures kept a journal or diary to record their experiences, thoughts, or feelings.
  Expressive writing through journaling can be a powerful way to process stress, trauma, and different emotions.
  `;
const posts = [
  {
    title: 'Simeon Lindstrom, Codependency',
    content:
      'When we have respect for ourselves and others, we gravitate towards connections that encourage that.',
  },
  {
    title: 'L. R. Ellert',
    content:
      'A man should have the aim and the determination to be honest and upright and sincere in all that he undertakes. If he adds persistency to this he can hardly help being successful',
  },
  {
    title: ' Kahlil Gibran',
    content:
      "The true wealth of a nation lies not in it's gold or silver but in it's learning, wisdom and in the uprightness of its sons.",
  },
];

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('index', {
    startingContent,
    homeImg:
      'https://images.unsplash.com/photo-1581284943246-0eb528155992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  });
});

app.get('/journals', (req, res) => {
  res.render('journals', {
    posts,
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(PORT, () => debug(`Server running on port ${chalk.bgCyan(PORT)}`));

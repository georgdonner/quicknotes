const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const morgan = require('morgan');
const path = require('path');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const User = require('./server/models/user');
require('dotenv').config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email'],
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOrCreate({
      username: profile.username,
      email: profile.emails[0].value,
      githubId: profile.id,
    });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
},
));

// passport configuration
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// connect to database
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
const dbConnection = mongoose.connection;

const app = express();

// express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
  name: 'quicknotes-session',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000 * 30, // one month
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/auth', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/api/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.redirect('/');
    }
    return res.redirect('http://127.0.0.1:3000');
  },
);

// redirect to React server in Development
if (process.env.NODE_ENV !== 'production') {
  app.get('/login', (req, res) => {
    res.redirect('http://127.0.0.1:3000/login');
  });
}

// hook up API
app.use('/api', require('./server/routes/note'));
app.use('/api', require('./server/routes/notebook'));
app.use('/api', require('./server/routes/user'));

// pass index.html from react to every other route in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// get port from env
const port = process.env.PORT || 8080;

// start server after successful database connection
dbConnection.on('connected', () => {
  console.log('Connected to database'); // eslint-disable-line no-console
  app.listen(port, () => {
    console.log(`Server started on port ${port}`); // eslint-disable-line no-console
  });
});

dbConnection.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console

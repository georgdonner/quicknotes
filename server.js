const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
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
    scope: ['user:email']
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      username: profile.username,
      email: profile.emails[0].value,
      githubId: profile.id
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  }
));

// passport configuration
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// connect to database
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
const dbConnection = mongoose.connection;

const app = express();

// express middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.json(req.user);
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server/views', 'login.html'));
});

app.get('/account', ensureAuthenticated, (req, res) => {
  res.send(`Hi ${req.user}, this is your account.`)
});

app.get('/auth', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/account');
  }
);

// hook up API
app.use('/api', require('./server/routes/note'));
app.use('/api', require('./server/routes/notebook'));
app.use('/api', require('./server/routes/user'));

// pass index.html from react to every other route in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// get port from env
const port = process.env.PORT || 8080;

// start server after successful database connection
dbConnection.on('connected', () => {
  console.log('Connected to database');
  app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
});

dbConnection.on('error', console.error.bind(console, 'connection error:'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
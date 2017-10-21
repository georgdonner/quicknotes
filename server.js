const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

// connect to database
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
const dbConnection = mongoose.connection;

const app = express();

// parse POST body
app.use(bodyParser.json());

// serve static assets
app.use(express.static(__dirname + '/build'));

// hook up API
app.use('/api', require('./server/routes/note'));
app.use('/api', require('./server/routes/notebook'));
app.use('/api', require('./server/routes/user'));

// pass index.html from react to every other route in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
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
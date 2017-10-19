const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./server/db');
require('dotenv').config();

const app = express();

// parse POST body
app.use(bodyParser.json());

// serve static assets
app.use(express.static(__dirname + '/build'));

// hook up API
const api = require('./server/routes/api');
app.use('/api', api);

// pass index.html from react to every other route in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  });
}

// get port from env
const port = process.env.PORT || 8080;

// connect to database
db.connect(process.env.MONGODB_URI, function(err) {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log('Server started on port ' + port);
    });
  }
});
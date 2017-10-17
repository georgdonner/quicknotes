const express = require('express');
const path = require('path');
const app = express();

// serve static assets
app.use(express.static(__dirname + '/build'));

// pass index.html from react to every other route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
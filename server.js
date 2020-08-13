// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();

// log all requests
app.use((req, res, next) => {
  console.log(`${Date.now()}: ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get(['/api/timestamp', '/api/timestamp/:date_string'], (req, res) => {
  const dateRequest = (+req.params.date_string)
      ? new Date(+req.params.date_string)
      : (req.params.date_string !== undefined)
          ? new Date(req.params.date_string)
          : new Date();
  const response = (dateRequest.getTime())
      ? {'unix': dateRequest.getTime(), 'utc': dateRequest.toUTCString()}
      : {'error': 'Invalid Date'};
  res.json(response);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
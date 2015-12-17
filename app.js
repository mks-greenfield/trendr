var express = require('express');
var request = require('request');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 3000);

app.listen(port);

console.log("Listening on: " + port);


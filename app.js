var express = require('express');
var request = require('request');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var twitter = require('twitter');
var fs = require('fs');
var path = require('path');

var app = express();
app.use(morgan('combined'));
//load client side assets
app.use(express.static(path.join(__dirname, 'public')));
//client side package manager
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 3000);

app.listen(port);

console.log("Listening on: " + port);


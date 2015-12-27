var express = require('express');
var router = express.Router();
var url = require('url');

/*************************************************************
GET /api/us/cities
**************************************************************/

router.get('/cities', function(req, res) {
  res.send('testing this route');
});

/*************************************************************
GET /api/us/states
**************************************************************/

router.get('/states', function(req, res) {
  res.send('testing this route');
});

/*************************************************************
GET /api/us/trends
**************************************************************/

router.get('/trends', function(req, res) {
  res.send('testing this route');
});

/*************************************************************
GET /api/us/country
**************************************************************/

router.get('/country', function(req, res) {
  res.send('testing this route');
});

module.exports = router;
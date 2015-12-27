var express = require('express');
var router = express.Router();

router.get('/test', function(req, res) {
  res.send('testing this route');
});

module.exports = router;
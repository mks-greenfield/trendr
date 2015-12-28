require('dotenv').load();

var db = require('./mongodb/config');
var USTrend = require('./mongodb/models/USTownTrend');
var async = require('async');
var _ = require('underscore');

exports.distinctCities = function(cb) {
  USTrend.distinct("location_name")
         .exec(cb);
}


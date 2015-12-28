require('dotenv').load();

var db = require('./mongodb/config');
var USTrend = require('./mongodb/models/USTownTrend');
var async = require('async');
var _ = require('underscore');

/*************************************************************
Globals
**************************************************************/

var today = new Date();

var startofToday = new Date();
startofToday.setHours(0);
startofToday.setMinutes(0);
startofToday.setSeconds(0);

/*************************************************************
Mongoose Queries
**************************************************************/

exports.distinctCities = function(cb) {
  USTrend.distinct("location_name")
         .exec(cb);
}

exports.distinctStates = function(cb) {
  USTrend.distinct("state")
         .exec(cb);
}

exports.distinctTrendsToday = function(cb) {
  USTrend.distinct("trend_name")
         .where({created_at: {$gt: startofToday, $lt: today}})
         .exec(cb);
}










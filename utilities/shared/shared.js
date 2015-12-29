/*************************************************************
Shared backend utility functions go here
**************************************************************/
var fs = require('fs');
var _ = require('underscore');

/*************************************************************
Example of writing to a file
**************************************************************/

// fs.writeFile('./tweets.txt', tweets, function(err){
//   if(err){console.log(err)}
// })

/*************************************************************
Histogram Function
**************************************************************/

var histogram = function(ar){
  return reduce(ar, function(obj, key){
    obj[key] = obj[key] || 0;
    obj[key]++;
    return obj;
  }, {});
};

/*************************************************************
Underscore mixin
**************************************************************/

_.mixin({
  'sortKeysBy': function (obj, comparator) {
    var keys = _.sortBy(_.keys(obj), function (key) {
      return comparator ? comparator(obj[key], key) : key;
    });

    return _.object(keys, _.map(keys, function (key) {
      return obj[key];
    }));
  }
});

//returns an object sorted by its keys in descending order
exports.sortKeysBy = function(obj) {
    return _.sortKeysBy(obj, function (value, key) {
            //changes from ascending to descending sort
            return -(value);
          })
}

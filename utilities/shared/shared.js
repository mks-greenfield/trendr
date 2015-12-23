/*************************************************************
Shared backend utility functions go here
**************************************************************/
var fs = require('fs');

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

angular.module('chart', ['chart.js'])

.controller('chartController', function($scope) {
  // get real data from JSON data

  $scope.labels = [];
  $scope.data = [];

  var dataObj = {
    "test1": 100,
    "test2": 300
  }

  for (var key in dataObj) {
    $scope.labels.push(key);
    $scope.data.push(dataObj[key]);
  }
});
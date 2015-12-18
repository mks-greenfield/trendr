angular.module('chart', ['chart.js'])

.controller('chartController', function($scope, $http) {
  // get real data from JSON data
  $scope.getTrends = function() {
    // $location.url('/chart');
    $http({
        method: 'GET',
        url: '/api'
      })
      .then(successCallback, errorCallback);
  }

  var successCallback = function(response) {
    response = {test: 1, three: 3}
    var responseObj = response
    $scope.labels = [];
    $scope.data = [];

    // var responseObj = {
    //   "test1": 100,
    //   "test2": 300
    // }

    for (var key in responseObj) {
      $scope.labels.push(key);
      $scope.data.push(responseObj[key]);
    }
  };
  var errorCallback = function() {
    // handle error
  };
});

angular.module('home', [])

.controller('homeController', function($scope, $location, $http) {
  $scope.message = "Welcome to the home page";

  $scope.getTrends = function() {
    $location.url('/chart');
    $http({
      method: 'GET',
      url: '/api'
    })
    .then(successCallback, errorCallback);
  }

  var successCallback = function() {
    // want to load new data into charts
  };
  var errorCallback = function() {
    // handle error
  };
})
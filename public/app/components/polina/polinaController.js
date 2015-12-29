var app = angular.module('polina', ['ngSanitize','ui.select'])

app.controller('PolinaController', function($scope, $http) {

  $scope.state = {};
  $scope.states = [];

  $scope.getStates = function() {

    $http({
      method: 'GET',
      url: '/api/us/states'
    }).then(function successCallback(response) {
        response.data.sort();
        angular.forEach(response.data, function(value) {
          $scope.states.push({name: value});
        });
      }, function errorCallback(response) {

      });
  };

  $scope.getStates();


  // $scope.getUSTopTrends = function() {

  //   $http({
  //     method: 'GET',
  //     url: 'api/us/country/today'
  //   }).then(function successCallback(response) {
  //       $scope.data = response.data;
  //     }, function errorCallback(response) {

  //     });
  // };

});
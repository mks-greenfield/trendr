angular.module('simon', [])

.controller('SimonController', function($scope, $http) {
  $scope.getStuff = function() {
    $http({
        method: 'GET',
        url: '/test'
      })
      .then(successCallback, errorCallback);
  }

  var successCallback = function(response) {
    console.log('RESPONSE', response);
    console.log("response.data", response.data);
  }
    
  var errorCallback = function() {
    // handle error
  };
});
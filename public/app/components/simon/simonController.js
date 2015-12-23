angular.module('simon', [])

<<<<<<< HEAD
=======
.controller('SimonController', function($scope, $http) {
  $scope.getStuff = function() {
    $http({
        method: 'GET',
        url: '/test'
      })
      .then(successCallback, errorCallback);
  }

  var successCallback = function(response) {
    // console.log("response.data", response.data);
  }
    
  var errorCallback = function() {
    // handle error
  };
>>>>>>> e7234f9e82f7bf50bade40979e2458aa33367cf1
});
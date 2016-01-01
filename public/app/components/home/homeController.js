angular.module('home', [])

.controller('HomeController', function($scope, $location, $http) {
  $scope.message = "Welcome to the home page";
});
angular.module('home', [])

.controller('homeController', function($scope, $location, $http) {
  $scope.message = "Welcome to the home page";

})
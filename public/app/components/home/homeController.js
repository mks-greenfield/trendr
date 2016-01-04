angular.module('home', [])

.controller('HomeController', function($scope, $location, $http) {
  $scope.message = "Trendr is a web application that interprets the top trending (most tweeted) hashtags from Twitter in the United States. On Trendr, you’ll find various ways to analyze the current top trends by city, or even by an entire state. What’s your trend?";
});
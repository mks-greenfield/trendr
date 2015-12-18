var trendr = angular.module('trendr', [
  'ngRoute',
  'home',
  'chart',
  'brandon',
  'geetha',
  'polina',
  'kevin',
  'simon'
  // add additional module names here
]);

trendr.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: './home/homeView.html',
    controller: 'HomeController'
  })
  .when('/chart', {
    templateUrl: './chart/chartView.html',
    controller: 'ChartController'
  })
  .when('/brandon', {
    templateUrl: './brandon/brandonView.html',
    controller: 'BrandonController'
  })
  .when('/geetha', {
    templateUrl: './geetha/geethaView.html',
    controller: 'GeethaController'
  })
  .when('/kevin', {
    templateUrl: './kevin/kevinView.html',
    controller: 'KevinController'
  })
  .when('/polina', {
    templateUrl: './polina/polinaView.html',
    controller: 'PolinaController'
  })
  .when('/simon', {
    templateUrl: './simon/simonView.html',
    controller: 'SimonController'
  })
  // add additional routes here

  .otherwise({
    redirectTo: '/'
  });
});
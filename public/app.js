var trendr = angular.module('trendr', [
  'ngRoute',
  'home',
  'chart',
  // add additional modules here
  'kevin'
]);

trendr.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: './home/homeView.html',
    controller: 'homeController'
  })
  .when('/chart', {
    templateUrl: './chart/chartView.html',
    controller: 'chartController'
  })
  // add additional routes here
  .when('/kevin', {
    templateUrl: './kevin/kevinView.html',
    controller: 'kevinController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
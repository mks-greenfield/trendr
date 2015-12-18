var trendr = angular.module('trendr', [
  'ngRoute',
  'home',
  'chart'
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
  .otherwise({
    redirectTo: '/'
  });
});
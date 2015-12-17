var trendr = angular.module('trendr', [
  'ngRoute',
  'home',
  'chart'
]);

trendr.config(function($routeProvider) {
  $routeProvider
  // havent got routing to work completely yet, show chart on root route

  // .when('/', {
  //   templateUrl: './home/homeView.html',
  //   controller: 'homeController'
  // })
  .when('/', {
    templateUrl: './chart/chartView.html',
    controller: 'chartController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
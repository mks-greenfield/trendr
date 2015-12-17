var trendr = angular.module('trendr', [
  'ngRoute',
  'home'
]);

trendr.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './home/homeView.html',
    controller: 'homeController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
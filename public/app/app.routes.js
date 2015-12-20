angular.module('routes', [])

.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: './app/components/home/homeView.html',
    controller: 'HomeController'
  })
  .when('/chart', {
    templateUrl: './app/components/chart/chartView.html',
    controller: 'ChartController'
  })
  .when('/brandon', {
    templateUrl: './app/components/brandon/brandonView.html',
    controller: 'BrandonController'
  })
  .when('/geetha', {
    templateUrl: './app/components/geetha/geethaView.html',
    controller: 'GeethaController'
  })
  .when('/kevin', {
    templateUrl: './app/components/kevin/kevinView.html',
    controller: 'KevinController'
  })
  .when('/polina', {
    templateUrl: './app/components/polina/polinaView.html',
    controller: 'PolinaController'
  })
  .when('/simon', {
    templateUrl: './app/components/simon/simonView.html',
    controller: 'SimonController'
  })
  // add additional routes here

  .otherwise({
    redirectTo: '/'
  });
});
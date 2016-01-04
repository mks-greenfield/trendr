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
  .when('/stackedAreaChart', {
    templateUrl: './app/components/stackedAreaChart/stackedAreaChartView.html',
    controller: 'stackedAreaChartController'
  })
  .when('/topTrendsByCity', {
    templateUrl: './app/components/topTrendsByCity/topTrendsByCityView.html',
    controller: 'TopTrendsByCityController'
  })
  .when('/usDataMap', {
    templateUrl: './app/components/usDataMap/usDataMapView.html',
    controller: 'usDataMapController'
  })
  // add additional routes here
  .otherwise({
    redirectTo: '/'
  });
});
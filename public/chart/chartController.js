angular.module('chart', ['chart.js'])

.controller('chartController', function($scope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];
});
})
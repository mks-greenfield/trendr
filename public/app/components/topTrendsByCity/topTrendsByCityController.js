angular.module('topTrendsByCity', ['TopTrendsByCityFactory'])

.controller('TopTrendsByCityController', function($scope, Locations) {

  $scope.getSanFrancisco = Locations.getSanFrancisco;
  $scope.getChicago = Locations.getChicago;
  $scope.getSanDiego = Locations.getSanDiego;
  $scope.getWashington = Locations.getWashington;
  $scope.getSeattle = Locations.getSeattle;
  $scope.getMiami = Locations.getMiami;
  $scope.getNewYorkCity = Locations.getNewYorkCity;
  $scope.getDenver = Locations.getDenver;
  $scope.getPortland = Locations.getPortland;
  $scope.getLasVegas = Locations.getLasVegas;
  $scope.getLosAngeles = Locations.getLosAngeles;
  $scope.getSacramento = Locations.getSacramento;
  $scope.getPhoenix = Locations.getPhoenix;

});

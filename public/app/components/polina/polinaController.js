angular.module('polina', ['ngSanitize','ui.select'])

.controller('PolinaController', function($scope, $http) {

  $scope.state = {};
  $scope.states = [];
  $scope.trends = '';

  $scope.$watch('state.selected', function(value) {
    if ($scope.state.selected) {
      console.log("watching", $scope.state.selected.name);
      $scope.getStatesWeeklyTrends($scope.state.selected.name);
    }
  });

  $scope.getStates = function() {

    $http({
      method: 'GET',
      url: '/api/us/states'
    }).then(function successCallback(response) {
        response.data.sort();
        angular.forEach(response.data, function(value) {
          $scope.states.push({name: value});
        });
      }, function errorCallback(response) {
        console.log("error", response);
      });
  };

  $scope.getStatesWeeklyTrends = function(stateName) {

    $http({
      method: 'GET',
      url: '/api/us/states/'+stateName+'/weeklyvolume'
    }).then(function successCallback(response) {

        var result = [];

        angular.forEach(response.data, function(value, key) {
          if (value === 0) {
          } else {
            var obj = {};
            obj.name = key;
            obj.tweet_volume = value;
            
            result.push(obj);
          }
        });

        $scope.trends = result;

      }, function errorCallback(response) {
        console.log("error", response);
      });
  };

  $scope.getStates();
});
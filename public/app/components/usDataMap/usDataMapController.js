var app = angular.module('usDataMap', ['datamaps']);

app.controller('usDataMapController', function($scope,$http) {

  $scope.trends = [];
  $scope.state = '';
  $scope.states = [];

  $scope.mapObject = {
    scope: 'usa',
    options: {
      width: 800,
      // legendHeight: 60 // optionally set the padding for the legend
    },
    geographyConfig: {
      highlighBorderColor: '#306596',
      highlighBorderWidth: 2,
      highlightFillColor: '#306596',
    },
    // fills: {
    //   'HIGH': '#CC4731',
    //   'MEDIUM': '#306596',
    //   'LOW': '#667FAF',
    //   'defaultFill': '#DDDDDD'
    // },
    data: {
      // "AZ": {
      //   "fillKey": "#306596",
      // }
    //   "CO": {
    //     "fillKey": "HIGH",
    //   },
    //   "DE": {
    //     "fillKey": "LOW",
    //   },
    //   "GA": {
    //     "fillKey": "MEDIUM",
    //   }
    }
  };

  $scope.selectState = function(geography) {
    console.log(geography.id); //state ID
    $scope.$apply(function(){$scope.state = geography.properties.name;});
    $scope.getStatesDailyTrends(geography.properties.name);
  }

  //get all states with available trends
  $scope.getStatesDailyTrends = function(stateName) {
    // spinner.spin(target);

    $http({
      method: 'GET',
      url: '/api/us/states/'+stateName+'/dailyvolume'
    }).then(function successCallback(response) {
        // spinner.stop();
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
        //take top 10 trends
        $scope.trends = result.slice(1, 11);

      }, function errorCallback(response) {
        console.log("error", response);
      });
  };

  $scope.getStates = function() {

    $http({
      method: 'GET',
      url: '/api/us/states'
    }).then(function successCallback(response) {
        response.data.sort();
        angular.forEach(response.data, function(value) {
          $scope.states.push({name: value});
        });
        console.log($scope.states);
      }, function errorCallback(response) {
        console.log("error", response);
      });
  };

  $scope.getStates();

});
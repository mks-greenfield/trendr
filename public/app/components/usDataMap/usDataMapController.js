var app = angular.module('usDataMap', ['datamaps']);

app.controller('usDataMapController', function($scope,$http) {

  $scope.trends = [];
  $scope.state = '';
  $scope.states = [];
  $scope.trend = {error: null};

  $scope.mapObject = {
    scope: 'usa',
    options: {
      width: 800,
    },
    geographyConfig: {
      highlighBorderColor: '#5bc0de',
      highlighBorderWidth: 2,
      highlightFillColor: '#5bc0de',
    },
    fills: {
      'BLUE': '#428bca',
      'defaultFill': '#DDDDDD'
    },
    data: {
    }
  };

  $scope.selectState = function(geography) {
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
        if (response.data[0] === "Empty") {
          $scope.trends = [];
          $scope.trend.error = "There are no available trends for this state. Please try another.";
        } else {
          
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
        $scope.trend.error = null;
        $scope.trends = result.slice(1, 11);
        }

      }, function errorCallback(response) {
        console.log("error", response);
      });
  };

  $scope.getStates = function() {

    $http({
      method: 'GET',
      url: '/api/us/states'
    }).then(function successCallback(response) {

        $scope.states = response.data;
        //add data to map object
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].id) {
            $scope.mapObject.data[response.data[i].id] = {"fillKey": "BLUE"};
          }
        }
      }, function errorCallback(response) {
        console.log("error", response);
      });
  };

  $scope.getStates();

});
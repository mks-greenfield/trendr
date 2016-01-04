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
      highlighBorderColor: '#d9534f',
      highlighBorderWidth: 2,
      highlightFillColor: '#d9534f',
    },
    fills: {
      'BLUE': '#428bca',
      'defaultFill': '#DDDDDD'
    },
    data: {
    }
  };

  var opts = {
    lines: 13, // The number of lines to draw
    length: 28, // The length of each line
    width: 14, // The line thickness
    radius: 42, // The radius of the inner circle
    scale: 1.75, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000', // #rgb or #rrggbb or array of colors
    opacity: 0.25, // Opacity of the lines
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    position: 'absolute' // Element positioning
  };
  var target = document.getElementById('spinner');
  var spinner = new Spinner(opts);

  $scope.selectState = function(geography) {
    $scope.$apply(function(){$scope.state = geography.properties.name;});
    $scope.getStatesDailyTrends(geography.properties.name);
  }

  //get all states with available trends
  $scope.getStatesDailyTrends = function(stateName) {
    spinner.spin(target);

    $http({
      method: 'GET',
      url: '/api/us/states/'+stateName+'/dailyvolume'
    }).then(function successCallback(response) {
        spinner.stop();
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
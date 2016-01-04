var app = angular.module('stackedAreaChart', ['ngSanitize','ui.select','nvd3']);

app.filter('escape', function() {
  return window.encodeURIComponent;
});

app.controller('stackedAreaChartController', function($scope, $http) {

  /* Chart options */
  $scope.options = {
    chart: {
      type: 'stackedAreaChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
      x: function(d) {
        return d[0];
      },
      y: function(d) {
        return d[1];
      },
      useVoronoi: false,
      clipEdge: true,
      duration: 100,
      useInteractiveGuideline: true,
      xAxis: {
        // showMaxMin: false,
        tickFormat: function(d) {
          //return d3.time.format('%x')(new Date(d))
          // return d+"days ago";
          // return "hey";
          return d;
        }
      },
      yAxis: {
        tickFormat: function(d) {
          return d3.format(',.2f')(d);
        }
      }
    }
  };

  $scope.data = [];

  $scope.city = {};
  $scope.cities = [];
  $scope.trends = [];
  $scope.selectedTrends = [];

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

    $scope.removeOne = function() {
      console.log("remove one");
      $scope.data.pop();
      // $scope.api.update();
    };

  $scope.addTrend = function(trend) {
    console.log("adding", trend);

    if ($scope.selectedTrends.indexOf(trend) === -1) {
      $scope.selectedTrends.push(trend);
      var obj = {
        "key": trend.name,
        "values": [
          [1, 23.041422681023],
          [2, 19.854291255832],
          [3, 21.02286281168],
          [4, 20]
        ]
      };
      $scope.data.push(obj);
    }
  };

  $scope.removeTrend = function(trend) {
    //console.log("remove", trend);
    var index = $scope.selectedTrends.indexOf(trend);

    $scope.selectedTrends.splice(index, 1);

    for (var i = 0; i < $scope.data.length; i++) {
      if ($scope.data[i].key === trend.name) {
        //console.log($scope.data[i]);
        $scope.data.splice(i, 1);
      }
    }
  };

  $scope.$watch('city.selected', function(value) {

    if ($scope.city.selected) {
      $scope.getCitiesDailyTrends($scope.city.selected.name);
      //reset chart data, current trend list, and selected trends
      $scope.data = [];
      $scope.trends = [];
      $scope.selectedTrends = [];
    }
  });

  $scope.addTrendDataToChart = function(trend, cityName) {

    if ($scope.selectedTrends.indexOf(trend) === -1) {
      // console.log("adding", trend);
      $scope.selectedTrends.push(trend);
      var encoded = encodeURIComponent(trend.name);
      console.log("cityname", cityName);
      
      var url = '/api/us/cities/' + cityName + '/' + encoded;
      // console.log("url", url);

      $http({
        method: 'GET',
        url: url,
      }).then(function successCallback(response) {
        // console.log("data", response.data);
        var obj = response.data;
        $scope.data.push(obj);
      }, function errorCallback(response) {
        // console.log("error", response);
      });
    }
  };

  $scope.getCities = function() {

    $http({
      method: 'GET',
      url: '/api/us/cities'
    }).then(function successCallback(response) {
      response.data.sort();
      angular.forEach(response.data, function(value) {
        $scope.states.push({
          name: value
        });
      });
    }, function errorCallback(response) {
      console.log("error", response);
    });
  };

  $scope.getCitiesDailyTrends = function(stateName) {
    spinner.spin(target);

    $http({
      method: 'GET',
      url: '/api/us/cities/' + stateName + '/dailyvolume'
    }).then(function successCallback(response) {
      spinner.stop();
      var result = [];

      angular.forEach(response.data, function(value, key) {
        if (value === 0) {} else {
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


  $scope.getCities();
});

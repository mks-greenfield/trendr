angular.module('chart', ['chart.js'])

.controller('ChartController', function($scope, $http) {

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
  var target = document.getElementById('foo');
  var spinner = new Spinner(opts);

  $scope.getTrends = function() {
    spinner.spin(target);
    $http({
        method: 'GET',
        url: '/db'
      })
      .then(successCallback, errorCallback);
  };

  var successCallback = function(response) {
    spinner.stop();
    console.log("response.data", response.data);
    $scope.labels = [];
    $scope.data = [];

    for (var i = 0; i < response.data.length; i++) {
      // console.log('WHAT IS GOING ON', response.data[i]);
      console.log('COUNTRY', response.data[i].country);
      $scope.labels.push(response.data[i].country);
      $scope.data.push(response.data[i].trend_volume);
    }
  };
  var errorCallback = function() {
    // handle error
  };
});

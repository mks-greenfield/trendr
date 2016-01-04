var app = angular.module('usDataMap', ['datamaps']);

app.controller('usDataMapController', function($scope) {
  $scope.message = "us data map controller";
  $scope.state = 'default';

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
    // data: {
    //   "AZ": {
    //     "fillKey": "MEDIUM",
    //   },
    //   "CO": {
    //     "fillKey": "HIGH",
    //   },
    //   "DE": {
    //     "fillKey": "LOW",
    //   },
    //   "GA": {
    //     "fillKey": "MEDIUM",
    //   }
    // },
  };

  $scope.selectState = function(geography) {
    console.log(geography.id); //state ID
    $scope.$apply(function(){$scope.state = geography.properties.name;});
  }

  // $scope.$on('selectState', function() {
  //     $scope.state = "hey";
  // });

  //get all states with available trends
  

});
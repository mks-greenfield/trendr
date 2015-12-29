angular.module('simon', [])

.controller('SimonController', function($scope, $http) {

  var dataArr = [];
  var title;
  var subtitle;
  var footer;

  var rawData;

  $scope.getLocationTrends = function() {
    var successCallback = function(response) {
      console.log('got trends!');
      rawData = response.data;
    };

    var errorCallback = function() {
      console.log('could not get trends');
    };
    $http({
        method: 'GET',
        url: '/locationTrends'
      })
      .then(successCallback, errorCallback);
  };


  $scope.getStuff = function() {
    var successCallback = function(response) {
      console.log('populating db');
    };

    var errorCallback = function() {
      // handle error
    };
    $http({
        method: 'GET',
        url: '/test'
      })
      .then(successCallback, errorCallback);
  };

  $scope.getLocationTrends();

  var randomColorGenerator = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  $scope.getSanFrancisco = function() {    
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'San Francisco') {
        dataArr.push({
          label: rawData[i].trend_name,
          value: rawData[i].tweet_volume,
          color: randomColorGenerator()
        });
      }
    }
    title = 'San Francisco'
    subtitle;
    footer;

    var pie = new d3pie("pieChart", {
      "header": {
        "title": {
          "text": title,
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": subtitle,
          "color": "#999999",
          "fontSize": 10,
          "font": "courier"
        },
        "location": "pie-center",
        "titleSubtitlePadding": 10
      },
      "footer": {
        "text": footer,
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "canvasWidth": 590,
        "pieInnerRadius": "95%",
        "pieOuterRadius": "70%"
      },
      "data": {
        "sortOrder": "label-desc",
        "content": dataArr
      },
      "labels": {
        "outer": {
          "format": "label-percentage1",
          "pieDistance": 20
        },
        "inner": {
          "format": "none"
        },
        "mainLabel": {
          "fontSize": 11
        },
        "percentage": {
          "color": "#999999",
          "fontSize": 11,
          "decimalPlaces": 0
        },
        "value": {
          "color": "#cccc43",
          "fontSize": 11
        },
        "lines": {
          "enabled": true,
          "color": "#777777"
        },
        "truncation": {
          "enabled": true
        }
      },
      "effects": {
        "pullOutSegmentOnClick": {
          "effect": "linear",
          "speed": 400,
          "size": 8
        }
      },
      "misc": {
        "colors": {
          "segmentStroke": "#000000"
        }
      }
    });
  }

  $scope.getChicago = function() {
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Chicago') {
        dataArr.push({
          label: rawData[i].trend_name,
          value: rawData[i].tweet_volume,
          color: randomColorGenerator()
        });
      }
    }
    title = 'Chicago'
    subtitle;
    footer;

    var pie = new d3pie("pieChart", {
      "header": {
        "title": {
          "text": title,
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": subtitle,
          "color": "#999999",
          "fontSize": 10,
          "font": "courier"
        },
        "location": "pie-center",
        "titleSubtitlePadding": 10
      },
      "footer": {
        "text": footer,
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "canvasWidth": 590,
        "pieInnerRadius": "95%",
        "pieOuterRadius": "70%"
      },
      "data": {
        "sortOrder": "label-desc",
        "content": dataArr
      },
      "labels": {
        "outer": {
          "format": "label-percentage1",
          "pieDistance": 20
        },
        "inner": {
          "format": "none"
        },
        "mainLabel": {
          "fontSize": 11
        },
        "percentage": {
          "color": "#999999",
          "fontSize": 11,
          "decimalPlaces": 0
        },
        "value": {
          "color": "#cccc43",
          "fontSize": 11
        },
        "lines": {
          "enabled": true,
          "color": "#777777"
        },
        "truncation": {
          "enabled": true
        }
      },
      "effects": {
        "pullOutSegmentOnClick": {
          "effect": "linear",
          "speed": 400,
          "size": 8
        }
      },
      "misc": {
        "colors": {
          "segmentStroke": "#000000"
        }
      }
    });
  }

});

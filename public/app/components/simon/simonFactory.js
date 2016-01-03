angular.module('simonFactory', [])

.factory('Locations', function($http) {

  var rawData;

  var randomColorGenerator = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  var getLocationTrends = function() {
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

  getLocationTrends();

  var makePie = function(nameOfCityInDB, chartTitle, chartSubtitle) {
    $('#pieChart').empty();
    var dataArr = [];

    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === nameOfCityInDB) {
        dataArr.push({
          label: rawData[i].trend_name,
          value: rawData[i].tweet_volume,
          color: randomColorGenerator()
        });
      }
    }

    var pie = new d3pie("pieChart", {
      "header": {
        "title": {
          "text": chartTitle,
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": chartSubtitle,
          "color": "#999999",
          "fontSize": 10,
          "font": "courier"
        },
        "location": "pie-center",
        "titleSubtitlePadding": 10
      },
      "size": {
        "canvasWidth": 800,
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
  };

  var getSanFrancisco = function() {
    makePie('San Francisco', 'San Francisco');
  };

  var getChicago = function() {
    makePie('Chicago', 'Chicago');
  };

  var getSanDiego = function() {
    makePie('San Diego', 'San Diego');
  };

  var getWashington = function() {
    makePie('Washington', 'Washington');
  };

  var getSeattle = function() {
    makePie('Seattle', 'Seattle');
  };

  var getMiami = function() {
    makePie('Miami', 'Miami');
  };

  var getNewYorkCity = function() {
    makePie('New York', 'New York City');
  };

  var getDenver = function() {
    makePie('Denver', 'Denver');
  };

  var getPortland = function() {
    makePie('Portland', 'Portland');
  };

  var getLasVegas = function() {
    makePie('Las Vegas', 'Las Vegas');
  };

  var getLosAngeles = function() {
    makePie('Los Angeles', 'Los Angeles');
  };

  var getSacramento = function() {
    makePie('Sacramento', 'Sacramento');
  };

  var getPhoenix = function() {
    makePie('Phoenix', 'Phoenix');
  };
  
  var obj = {
    getSanFrancisco: getSanFrancisco,
    getChicago: getChicago,
    getSanDiego: getSanDiego,
    getWashington: getWashington,
    getSeattle: getSeattle,
    getMiami: getMiami,
    getNewYorkCity: getNewYorkCity,
    getDenver: getDenver,
    getPortland: getPortland,
    getLasVegas: getLasVegas,
    getLosAngeles: getLosAngeles,
    getSacramento: getSacramento,
    getPhoenix: getPhoenix
  }

  return obj;
});

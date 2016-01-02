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

  var getSanFrancisco = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'San Francisco') {
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
          "text": "San Francisco",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getChicago = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Chicago') {
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
          "text": "Chicago",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getSanDiego = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'San Diego') {
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
          "text": "San Diego",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getWashington = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Washington') {
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
          "text": "Washington",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getSeattle = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Seattle') {
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
          "text": "Seattle",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getMiami = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Miami') {
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
          "text": "Miami",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getNewYorkCity = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'New York') {
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
          "text": "New York City",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

var getDenver = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Denver') {
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
          "text": "Denver",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

var getPortland = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Portland') {
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
          "text": "Portland",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getLasVegas = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Las Vegas') {
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
          "text": "Las Vegas",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

var getLosAngeles = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Los Angeles') {
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
          "text": "Los Angeles",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getSacramento = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Sacramento') {
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
          "text": "Sacramento",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

  var getPhoenix = function() {
    $('#pieChart').empty();
    var dataArr = [];
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].location === 'Phoenix') {
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
          "text": "Phoenix",
          "fontSize": 34,
          "font": "courier"
        },
        "subtitle": {
          "text": "subtitle",
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

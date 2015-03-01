angular
  .module('eval.dashboard')
  .controller('DashboardController', DashboardController);
  DashboardController.$inject = [
    '$scope',
    '$http',
    'DashboardSentimentFactory',
    'DashboardCommentsFactory',
    'AuthFactory',
    '$rootScope'
  ];

  function DashboardController ($scope, $http, DashboardSentimentFactory, DashboardCommentsFactory, AuthFactory, $rootScope) {
    // console.log('sampleData', sampleData);

    $scope.data = {};
    $scope.sortedData = {};
    $scope.dataProcessedTime = {};

    $scope.averageSentiment = '0';
    $scope.responseCount = '0';

    $scope.sentimentChart = null;
    $scope.responsesChart = null;

    $scope.initialize = function() {
      $http.get('/comments').
        success(function(data, status, headers, config) {
          $scope.data = data;
          $rootScope.data = data;
          // this callback will be called asynchronously
          // when the response is available
          $scope.sortedData = DashboardSentimentFactory.sortByTime($scope.data);
          // $scope.sortedData = DashboardSentimentFactory.sortByTime(sampleData);
          // console.log('sortedData', sortedData);
          $scope.dataProcessedTime = DashboardSentimentFactory.changeTimeFormat($scope.sortedData);
          // console.log('$scope.dataProcessedTime', $scope.dataProcessedTime);
          $scope.showCharts();
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }



    $scope.showCharts = function() {

        $scope.sentimentChart = c3.generate({
          bindto: '#sentiment-chart',
          data: {
            columns: [
              ['data', 90, 50, 40, -94, 30, 40, 90],
            ],
            type: 'bar',
            colors: {
                'data': function(d) { return d.value < 0 ? '#D38940' : '#0061AB'; }
            }
          },
          bar: {
            width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
          },
          grid: {
            y: {
              show: true
            }
          },
          legend: {
            show: false
          },
          axis: {
            x: {
              type: 'category',
              categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            },
            y: {
              max: 100,
              min: -100,
              padding: {top:0, bottom:0},
              label: { // ADD
                text: 'Percent',
                position: 'outer-middle'
              },
              tick: {
                count: 5
              }
            }
          }
        });

        $scope.responsesChart = c3.generate({
          bindto: '#responses-chart',
          data: {
            columns: [
              ['data', 30, 200, 100, 400, 150, 250, 138]
            ]
          },
          grid: {
            y: {
              show: true
            }
          },
          legend: {
            show: false
          },
          axis: {
            x: {
              type: 'category',
              categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            },
            y: {
              max: 500,
              min: 0,
              padding: {top:0, bottom:0},
              label: { // ADD
                text: 'Number of Responses',
                position: 'outer-middle'
              },
              tick: {
                count: 6
              }
            }
          }
        });

        $scope.changeSentimentChartView('month');
        $scope.changeResponsesChartView('month');

    }

    $scope.changeSentimentChartView = function(time) {
      switch (time) {
        case 'day':
          var tempData = DashboardSentimentFactory.filterByDay($scope.dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          var arrayOfHours = Object.keys(newData);
          console.log('lookatthisnewdata', newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i <= getHour(); i++) {
            if (arrayOfHours[i]) {
              newDataProcessed.push(newData[arrayOfHours[i]]);
            } else {
              newDataProcessed.push(0);
            }
          }

          $scope.sentimentChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
          });
          break;
        case 'week':
          var tempData = DashboardSentimentFactory.filterByWeek($scope.dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          var arrayOfDays = Object.keys(newData);
          console.log('lookatthisnewdata', newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i <= getDay(); i++) {
            if (arrayOfDays[i]) {
              newDataProcessed.push(newData[arrayOfDays[i]]);
            } else {
              newDataProcessed.push(0);
            }
          }
          $scope.sentimentChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
          });
          break;
        case 'month':
          var tempData = DashboardSentimentFactory.filterByMonth($scope.dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          var arrayOfMonths = Object.keys(newData);
          console.log('lookatthisnewdata', newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i <= getMonth(); i++) {
            if (arrayOfMonths[i]) {
              newDataProcessed.push(newData[arrayOfMonths[i]]);
            } else {
              newDataProcessed.push(0);
            }
          }

          $scope.sentimentChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          });
          break;
        case 'year':
          var tempData = DashboardSentimentFactory.filterByYear($scope.dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          var arrayOfYears = Object.keys(newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i < arrayOfYears.length; i++) {
            newDataProcessed.push(newData[arrayOfYears[i]]);
          }
          console.log('arrayOfYears', arrayOfYears);
          $scope.sentimentChart.load({
            columns: [
              newDataProcessed
            ],
            categories: arrayOfYears
          });
          break;
      }
    }

    $scope.changeResponsesChartView = function(time) {
      switch (time) {
        case 'day':
          var newData = DashboardCommentsFactory.filterByDay($scope.dataProcessedTime);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          var arrayOfHours = Object.keys(newData);
          console.log('lookatthisnewdata', newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i < getHour(); i++) {
            if (arrayOfHours[i]) {
              newDataProcessed.push(newData[arrayOfHours[i]]);
            } else {
              newDataProcessed.push(0);
            }
          }

          $scope.responsesChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
          });
          break;
        case 'week':
          var newData = DashboardCommentsFactory.filterByWeek($scope.dataProcessedTime);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          var arrayOfDays = Object.keys(newData);
          console.log('lookatthisnewdata', newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i <= getDay(); i++) {
            if (newData[arrayOfDays[i]]) {
              newDataProcessed.push(newData[arrayOfDays[i]]);
            } else {
              newDataProcessed.push(0);
            }
          }
          console.log($scope.responseCount);
          $scope.responsesChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
          });
          break;
        case 'month':

          var newData = DashboardCommentsFactory.filterByMonth($scope.dataProcessedTime);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          var arrayOfMonths = Object.keys(newData);
          console.log('lookatthisnewdata', newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i <= getMonth(); i++) {
            if (newData[arrayOfMonths[i]]) {
              newDataProcessed.push(newData[arrayOfMonths[i]]);
            } else {
              newDataProcessed.push(0);
            }
          }
          $scope.responsesChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          });
          break;
        case 'year':
          var newData = DashboardCommentsFactory.filterByYear($scope.dataProcessedTime);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          var arrayOfYears = Object.keys(newData);
          var newDataProcessed = ['data'];

          // need to fix in case missing some in between years
          for (var i = 0; i < arrayOfYears.length; i++) {
            newDataProcessed.push(newData[arrayOfYears[i]]);
          }
          console.log('arrayOfYears', arrayOfYears);
          $scope.responsesChart.load({
            columns: [
              newDataProcessed
            ],
            categories: arrayOfYears
          });
          break;
      }
    }
  }

  function getHour() {
    var date = new Date();
    var hour = date.getHours();
    return hour;
  }

  function getDay() {
    var date = new Date();
    var day = date.getDay();
    return day;
  }

  function getMonth() {
    var date = new Date();
    var month = date.getMonth();
    return month;
  }

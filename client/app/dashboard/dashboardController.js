angular
  .module('eval.dashboard')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = [
    '$scope',
    'DashboardSentimentFactory',
    'DashboardCommentsFactory',
    'AuthFactory'
  ];

  function DashboardController ($scope, DashboardSentimentFactory, DashboardCommentsFactory, AuthFactory) {
    // console.log('sampleData', sampleData);

    var sortedData = DashboardSentimentFactory.sortByTime(sampleData);
    // console.log('sortedData', sortedData);
    var dataProcessedTime = DashboardSentimentFactory.changeTimeFormat(sortedData);
    // console.log('dataProcessedTime', dataProcessedTime);
    $scope.averageSentiment = '0';
    $scope.responseCount = '140';

    $scope.sentimentChart = null;
    $scope.responsesChart = null;

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

    }

    $scope.changeSentimentChartView = function(time) {
      switch (time) {
        case 'day':
          var tempData = DashboardSentimentFactory.filterByDay(dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          $scope.sentimentChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6],
              newData[7], newData[8], newData[9], newData[10], newData[11], newData[12], newData[13], newData[14],
              newData[15], newData[16], newData[17], newData[18], newData[19], newData[20], newData[21], newData[22],
              newData[23]]
            ],
            categories: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']
          });
          break;
        case 'week':
          var tempData = DashboardSentimentFactory.filterByWeek(dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          console.log('newData', newData)
          $scope.sentimentChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6]]
            ],
            categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
          });
          break;
        case 'month':
          var tempData = DashboardSentimentFactory.filterByMonth(dataProcessedTime);
          var newData = tempData[0];
          $scope.averageSentiment = tempData[1];
          $scope.sentimentChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6], newData[7], newData[8], newData[9], newData[10], newData[11]]
            ],
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          });
          break;
        case 'year':
          var tempData = DashboardSentimentFactory.filterByYear(dataProcessedTime);
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
          var newData = DashboardCommentsFactory.filterByDay(dataProcessedTime);
          console.log('lookatthisnewdata', newData);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          $scope.responsesChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6],
              newData[7], newData[8], newData[9], newData[10], newData[11], newData[12], newData[13], newData[14],
              newData[15], newData[16], newData[17], newData[18], newData[19], newData[20], newData[21], newData[22],
              newData[23]]
            ],
            categories: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am']
          });
          break;
        case 'week':
          var newData = DashboardCommentsFactory.filterByWeek(dataProcessedTime);
          console.log('lookatthisnewdata', newData);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          console.log($scope.responseCount);
          $scope.responsesChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6]]
            ],
            categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
          });
          break;
        case 'month':
          var newData = DashboardCommentsFactory.filterByMonth(dataProcessedTime);
          console.log('lookatthisnewdata', newData);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          $scope.responsesChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6], newData[7], newData[8], newData[9], newData[10], newData[11]]
            ],
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          });
          break;
        case 'year':
          var newData = DashboardCommentsFactory.filterByYear(dataProcessedTime);
          $scope.responseCount = _.reduce(newData, function(result, value, key) {
            result += value
            return result
          }, 0)
          var arrayOfYears = Object.keys(newData);
          var newDataProcessed = ['data'];
          for (var i = 0; i < arrayOfYears.length; i++) {
            newDataProcessed.push(newData[arrayOfYears[i]]);
          }
          console.log('arrayOfYears', arrayOfYears);
          $scope.responsesChart.load({
            columns: [
              newDataProcessed
            ],
            categories: ['2010', '2011', '2012', '2013', '2014', '2015']
          });
          break;
      }
    }

  }
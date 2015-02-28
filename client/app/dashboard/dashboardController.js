angular
  .module('eval.dashboard')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = [
    '$scope',
    'DashboardFactory',
    'AuthFactory',
  ];

  function DashboardController ($scope, DashboardFactory, AuthFactory) {
    console.log('sampleData', sampleData);

    var sortedData = DashboardFactory.sortByTime(sampleData);
    console.log('sortedData', sortedData);
    var dataProcessedTime = DashboardFactory.changeTimeFormat(sortedData);
    console.log('dataProcessedTime', dataProcessedTime);
    $scope.averageSentiment = '80';
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
                'data': function(d) { return d.value < 0 ? '#FF0000' : '#0000FF'; }
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
          axis: {
            x: {
              type: 'category',
              categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
            ['data1', 30, 200, 100, 400, 150, 250, 138]
          ]
        },
        grid: {
          y: {
            show: true
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
          var newData = DashboardFactory.filterByDay(dataProcessedTime);
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
          var newData = DashboardFactory.filterByWeek(dataProcessedTime);
          console.log('newData', newData)
          $scope.sentimentChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6]]
            ],
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          });
          break;
        case 'month':
          var newData = DashboardFactory.filterByMonth(dataProcessedTime);
          $scope.sentimentChart.load({
            columns: [
              ['data', newData[0], newData[1], newData[2], newData[3], newData[4], newData[5], newData[6], newData[7], newData[8], newData[9], newData[10], newData[11]]
            ],
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          });
          break;
        case 'year':
          var newData = DashboardFactory.filterByYear(dataProcessedTime);
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
          $scope.responsesChart.load({
            categories: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am']
          });
          break;
        case 'week':
          $scope.responsesChart.load({
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          });
          break;
        case 'month':
          $scope.responsesChart.load({
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          });
          break;
        case 'year':
          $scope.responsesChart.load({
            categories: ['2010', '2011', '2012', '2013', '2014', '2015']
          });
          break;
      }
    }

  }
angular
  .module('eval.dashboard', [])
  .factory('DashboardFactory', DashboardFactory);

  DashboardFactory.$inject = [
    '$http',
    'AuthFactory',
  ];

  function DashboardFactory ($http, AuthFactory) {
    var factory = {};
    factory.sortByTime = sortByTime;
    factory.changeTimeFormat = changeTimeFormat;
    factory.filterByDay = filterByDay;
    factory.filterByWeek = filterByWeek;
    factory.filterByMonth = filterByMonth;
    factory.filterByYear = filterByYear;

    function filterByDay(data) {
      // console.log('filterByWeek', data);
      var processedData = {};
      for (var i = 0; i < data.length; i ++) {
        var hour = data[i].date.getHours();
        if (processedData[hour]) {
          processedData[hour][0] += data[i].score;
          processedData[hour][1]++;
        } else {
          processedData[hour] = [data[i].score, 1];
        }
      }

      for (var hour in processedData) {
        processedData[hour] = ((processedData[hour][0]/processedData[hour][1]) * 10000);
      }
      console.log('processedData', processedData)
      return processedData;
    }

    function filterByWeek(data) {
      // console.log('filterByWeek', data);
      var processedData = {};
      for (var i = 0; i < data.length; i ++) {
        var day = data[i].date.getDay();
        if (processedData[day]) {
          processedData[day][0] += data[i].score;
          processedData[day][1]++;
        } else {
          processedData[day] = [data[i].score, 1];
        }
      }

      for (var day in processedData) {
        processedData[day] = ((processedData[day][0]/processedData[day][1]) * 10000);
      }
      console.log('processedData', processedData)
      return processedData;
    }

    function filterByMonth(data) {
      // console.log('filterByWeek', data);
      var processedData = {};
      for (var i = 0; i < data.length; i ++) {
        var month = data[i].date.getMonth();
        if (processedData[month]) {
          processedData[month][0] += data[i].score;
          processedData[month][1]++;
        } else {
          processedData[month] = [data[i].score, 1];
        }
      }

      for (var month in processedData) {
        processedData[month] = ((processedData[month][0]/processedData[month][1]) * 10000);
      }
      console.log('processedData', processedData)
      return processedData;
    }

    function filterByYear(data) {
      // console.log('filterByWeek', data);
      var processedData = {};
      for (var i = 0; i < data.length; i ++) {
        var year = data[i].date.getFullYear();
        if (processedData[year]) {
          processedData[year][0] += data[i].score;
          processedData[year][1]++;
        } else {
          processedData[year] = [data[i].score, 1];
        }
      }

      for (var year in processedData) {
        processedData[year] = ((processedData[year][0]/processedData[year][1]) * 10000);
      }
      console.log('processedData', processedData)
      return processedData;
    }

    function sortByTime(data) {
      var sortedData = data.sort(compareByDateMilliseconds);

      function compareByDateMilliseconds(a, b) {
        return a.date - b.date;
      }

      return sortedData;
    }

    function changeTimeFormat(data) {
      return _.map(data, function(datum) {
        datum.date = new Date(datum.date);
        // console.log('changeTimeFormatFunction', datum);
        return datum;
      });
    }

    return factory;
  }

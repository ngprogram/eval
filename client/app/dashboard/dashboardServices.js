angular
  .module('eval.dashboard', [])
  .factory('DashboardSentimentFactory', DashboardSentimentFactory)
  .factory('DashboardCommentsFactory', DashboardCommentsFactory);

DashboardSentimentFactory.$inject = [
  '$http',
  'AuthFactory',
  'DateFactory'
];

DashboardCommentsFactory.$inject = [
  '$http',
  'AuthFactory',
  'DateFactory'
];

function DashboardSentimentFactory ($http, AuthFactory, DateFactory) {
  var factory = {};
  var isWithinPastDay = DateFactory.isWithinPastDay;
  var isWithinPastWeek = DateFactory.isWithinPastWeek;
  var isWithinPastMonth = DateFactory.isWithinPastMonth;
  var isWithinPastYear = DateFactory.isWithinPastYear;


  factory.filterByDay = filterByDay;
  factory.filterByWeek = filterByWeek;
  factory.filterByMonth = filterByMonth;
  factory.filterByYear = filterByYear;

  function filterByDay(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var hour = data[i].date.getHours();
      if (isWithinPastDay(data[i].date)) {
        if (processedData[hour]) {
          processedData[hour][0] += data[i].score;
          processedData[hour][1]++;
        } else {
          processedData[hour] = [data[i].score, 1];
        }
      }
    }

    var summedTotals = _.reduce(processedData, function(result, value, key) {
      result[0] += value[0];
      result[1] += value[1];
      return result
    }, [0, 0])

    var averageSentiment = summedTotals[0]/summedTotals[1] * 100;

    for (var hour in processedData) {
      processedData[hour] = ((processedData[hour][0]/processedData[hour][1]) * 100);
    }
    return [processedData, averageSentiment];
  }

  function filterByWeek(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var day = data[i].date.getDay();
      if (isWithinPastWeek(data[i].date)) {
        if (processedData[day]) {
          processedData[day][0] += data[i].score;
          processedData[day][1]++;
        } else {
          processedData[day] = [data[i].score, 1];
        }
      }
    }

    var summedTotals = _.reduce(processedData, function(result, value, key) {
      result[0] += value[0];
      result[1] += value[1];
      return result
    }, [0, 0])

    var averageSentiment = summedTotals[0]/summedTotals[1] * 100;

    for (var day in processedData) {
      processedData[day] = ((processedData[day][0]/processedData[day][1]) * 100);
    }
    return [processedData, averageSentiment];
  }

  function filterByMonth(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var month = data[i].date.getMonth();
      if (isWithinPastYear(data[i].date)) {
        if (processedData[month]) {
          processedData[month][0] += data[i].score;
          processedData[month][1]++;
        } else {
          processedData[month] = [data[i].score, 1];
        }
      }
    }

    var summedTotals = _.reduce(processedData, function(result, value, key) {
      result[0] += value[0];
      result[1] += value[1];
      return result
    }, [0, 0])

    var averageSentiment = summedTotals[0]/summedTotals[1] * 100;

    for (var month in processedData) {
      processedData[month] = ((processedData[month][0]/processedData[month][1]) * 100);
    }

    return [processedData, averageSentiment];
  }

  function filterByYear(data) {
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

    var summedTotals = _.reduce(processedData, function(result, value, key) {
      result[0] += value[0];
      result[1] += value[1];
      return result
    }, [0, 0])

    var averageSentiment = summedTotals[0]/summedTotals[1] * 100;

    for (var year in processedData) {
      processedData[year] = ((processedData[year][0]/processedData[year][1]) * 100);
    }
    return [processedData, averageSentiment];
  }

  return factory;
}

function DashboardCommentsFactory ($http, AuthFactory, DateFactory) {
  var factory = {};
  var isWithinPastDay = DateFactory.isWithinPastDay;
  var isWithinPastWeek = DateFactory.isWithinPastWeek;
  var isWithinPastMonth = DateFactory.isWithinPastMonth;
  var isWithinPastYear = DateFactory.isWithinPastYear;

  factory.filterByDay = filterByDay;
  factory.filterByWeek = filterByWeek;
  factory.filterByMonth = filterByMonth;
  factory.filterByYear = filterByYear;

  function filterByDay(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var hour = data[i].date.getHours();
      if (isWithinPastDay(data[i].date)) {
        if (processedData[hour]) {
          processedData[hour]++;
        } else {
          processedData[hour] = 1;
        }
      }
    }

    return processedData;
  }

  function filterByWeek(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var day = data[i].date.getDay();
      if (isWithinPastWeek(data[i].date)) {
        if (processedData[day]) {
          processedData[day]++;
        } else {
          processedData[day] = 1;
        }
      }
    }

    return processedData;
  }

  function filterByMonth(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var month = data[i].date.getMonth();
      if (isWithinPastYear(data[i].date)) {
        if (processedData[month]) {
          processedData[month]++;
        } else {
          processedData[month] = 1;
        }
      }
    }

    return processedData;
  }

  function filterByYear(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i ++) {
      var year = data[i].date.getFullYear();
      if (processedData[year]) {
        processedData[year]++;
      } else {
        processedData[year] = 1;
      }
    }

    return processedData;
  }

  return factory;
}
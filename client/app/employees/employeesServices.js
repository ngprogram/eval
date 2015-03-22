angular
  .module('eval.employees', [])
  .factory('EmployeesFactory', EmployeesFactory);

  EmployeesFactory.$inject = [
    '$http',
    'AuthFactory',
    'DateFactory'
  ];

function EmployeesFactory ($http, AuthFactory, DateFactory) {
  var factory = {};
  var isWithinPastWeek = DateFactory.isWithinPastWeek;
  var isWithinPastMonth = DateFactory.isWithinPastMonth;
  var isWithinPastYear = DateFactory.isWithinPastYear;

  factory.processEmployeesData = processEmployeesData;
  factory.separateDataByEmployee = separateDataByEmployee;
  factory.processSingleEmployeeData = processSingleEmployeeData;

  function processEmployeesData(data) {
    var resultArray = [];
    var separatedData = separateDataByEmployee(data);
    for (var name in separatedData) {
      var obj = processSingleEmployeeData(separatedData[name]);
      obj.employee_name = name;
      resultArray.push(obj);
    }
    return resultArray;
  }

  function separateDataByEmployee(data) {
    var processedData = {};
    for (var i = 0; i < data.length; i++) {
      if (processedData[data[i].employee_name]) {
        processedData[data[i].employee_name].push(data[i]);
      } else {
        processedData[data[i].employee_name] = [data[i]];
      }
    }
    return processedData;
  }

  function processSingleEmployeeData(dataArray) {
    var processedData = {};
    processedData.averageSentiment = {};
    processedData.numberOfComments = {
      week: 0,
      month: 0,
      year: 0
    };
    processedData.comments = [];

    var weekSentimentTotal = [0, 0];
    var monthSentimentTotal = [0, 0];
    var yearSentimentTotal = [0, 0];

    processedData.name = dataArray[0].employee_name;

    for (var i = 0; i < dataArray.length; i++) {
      processedData.comments.push({
        comment: dataArray[i].comment,
        score: Math.round(dataArray[i].score * 100)+'%',
        date: (new Date(dataArray[i].date)).toLocaleDateString(),
        time: (new Date(dataArray[i].date)).toLocaleTimeString()
      });

      if (isWithinPastWeek(dataArray[i].date)) {
        processedData.numberOfComments.week++;
        weekSentimentTotal[0] += dataArray[i].score;
        weekSentimentTotal[1]++;
      }
      if (isWithinPastMonth(dataArray[i].date)) {
        processedData.numberOfComments.month++;
        monthSentimentTotal[0] += dataArray[i].score;
        monthSentimentTotal[1]++;
      }
      if (isWithinPastYear(dataArray[i].date)) {
        processedData.numberOfComments.year++;
        yearSentimentTotal[0] += dataArray[i].score;
        yearSentimentTotal[1]++;
      }
    }

    processedData.averageSentiment.week = ( Math.round(weekSentimentTotal[0]/weekSentimentTotal[1] * 100) || 0 ) + '%';
    processedData.averageSentiment.month = ( Math.round(monthSentimentTotal[0]/monthSentimentTotal[1] * 100) || 0 ) + '%';
    processedData.averageSentiment.year = ( Math.round(yearSentimentTotal[0]/yearSentimentTotal[1] * 100) || 0 ) + '%';

    return processedData;
  }

  return factory;
}
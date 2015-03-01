angular
  .module('eval.employees', [])
  .factory('EmployeesFactory', EmployeesFactory);

  EmployeesFactory.$inject = [
    '$http',
    'AuthFactory',
  ];

  function EmployeesFactory ($http, AuthFactory) {
    var factory = {};
    factory.processEmployeesData = processEmployeesData;
    factory.separateDataByEmployee = separateDataByEmployee;
    factory.processSingleEmployeeData = processSingleEmployeeData;

    function processEmployeesData(data) {
      var separatedData = separateDataByEmployee(data);
      for (var name in separatedData) {
        separatedData[name] = processSingleEmployeeData(separatedData[name]);
      }
      return separatedData;
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

      // [sentiment total, count]
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
          processedData.numberOfComments.month++;
          processedData.numberOfComments.year++;
          weekSentimentTotal[0] += dataArray[i].score;
          weekSentimentTotal[1]++;
          monthSentimentTotal[0] += dataArray[i].score;
          monthSentimentTotal[1]++;
          yearSentimentTotal[0] += dataArray[i].score;
          yearSentimentTotal[1]++;
        } else if (isWithinPastMonth(dataArray[i].date)) {
          processedData.numberOfComments.month++;
          processedData.numberOfComments.year++;
          monthSentimentTotal[0] += dataArray[i].score;
          monthSentimentTotal[1]++;
          yearSentimentTotal[0] += dataArray[i].score;
          yearSentimentTotal[1]++;
        } else if (isWithinPastYear(dataArray[i].date)) {
          processedData.numberOfComments.year++;
          yearSentimentTotal[0] += dataArray[i].score;
          yearSentimentTotal[1]++;
        }
      }
      
      processedData.averageSentiment.week = ( Math.round(weekSentimentTotal[0]/weekSentimentTotal[1] * 100) || 0 ) + '%';
      processedData.averageSentiment.month = ( Math.round(monthSentimentTotal[0]/monthSentimentTotal[1] * 100) || 0 ) + '%';
      processedData.averageSentiment.year = ( Math.round(yearSentimentTotal[0]/yearSentimentTotal[1] * 100) || 0 ) + '%';

      console.log('processedData', processedData);
      return processedData;
    }

    function isWithinPastDay(date) {
      var inPastDay = false;
      //get now date
      var now = new Date();
      // console.log('now', now);
      //get the month in the year
      var year = now.getFullYear();
      var month = now.getMonth();
      var date = now.getDate();
      // console.log(year, month, date);
      var nearestMidnightDateAtMidnight = new Date(year, month, date);
      // console.log('nearestMidnightDateAtMidnight', nearestMidnightDateAtMidnight);
      //compare if the value is greater than this one above
      if (date > nearestMidnightDateAtMidnight) {
        inPastDay = true;
      }
      return inPastDay;
    }

    function isWithinPastWeek(date) {
      var inPastWeek = false;
      //get now date
      var now = new Date();
      // console.log('now', now);
      //get the day of the week
      var day = now.getDay();
      //change to milliseconds
      var nowDateInMilliseconds = Date.parse(now);
      //subtract milliseconds * day
      var nearestSundayInMilliseconds = nowDateInMilliseconds - day * 86400000; //86400000 milliseconds in a day
      //subtract the right amount of time to get to a sunday
      var nearestSundayDate = new Date(nearestSundayInMilliseconds);
      // console.log('nearestSundayDate', nearestSundayDate)
      //generate new date using that info and 0,0,0
      var sundayYear = nearestSundayDate.getFullYear();
      // console.log(sundayYear);
      var sundayMonth = nearestSundayDate.getMonth();
      // console.log(sundayMonth);
      var sundayDate = nearestSundayDate.getDate();
      // console.log(sundayMonth);
      var nearestSundayDateAtMidnight = new Date(sundayYear, sundayMonth, sundayDate);
      // console.log('nearestSundayDateAtMidnight', nearestSundayDateAtMidnight);
      //compare if the value is greater than this one above
      if (date > nearestSundayDateAtMidnight) {
        inPastWeek = true;
      }
      return inPastWeek;
    }

    function isWithinPastMonth(date) {
      var inPastMonth = false;
      //get now date
      var now = new Date();
      // console.log('now', now);
      //get the month in the year
      var year = now.getFullYear();
      var month = now.getMonth();
      // console.log(year);
      var nearestFirstDayOfMonthAtMidnight = new Date(year, month, 1);
      // console.log('nearestFirstDayOfMonthAtMidnight', nearestFirstDayOfMonthAtMidnight);
      //compare if the value is greater than this one above
      if (date > nearestFirstDayOfMonthAtMidnight) {
        inPastMonth = true;
      }
      return inPastMonth;
    }

    function isWithinPastYear(date) {
      var inPastYear = false;
      //get now date
      var now = new Date();
      // console.log('now', now);
      //get the month in the year
      var year = now.getFullYear();
      // console.log(year);
      var nearestJanuaryDateAtMidnight = new Date(year, 0, 1);
      // console.log('nearestJanuaryDateAtMidnight', nearestJanuaryDateAtMidnight);
      //compare if the value is greater than this one above
      if (date > nearestJanuaryDateAtMidnight) {
        inPastYear = true;
      }
      return inPastYear;
    }

    return factory;
  }




  // { phone_number: '+15150082767',
  //   date: 1407558943841,
  //   comment: 'i think that the cashier is cute',
  //   companyId: 1234,
  //   employee_name: 'Kim',
  //   score: 0.7213262310251594 },
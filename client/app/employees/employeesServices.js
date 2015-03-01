angular
  .module('eval.employees', [])
  .factory('EmployeesFactory', EmployeesFactory);

  EmployeesFactory.$inject = [
    '$http',
    'AuthFactory',
  ];

  function EmployeesFactory ($http, AuthFactory) {
    var factory = {};
    factory.separateDataByEmployee = separateDataByEmployee;
    console.log(sampleData);

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
      var averageSentiment = {
        week: 0,
        month: 0,
        year: 0
      };
      var numberOfComments = {
        week: 0,
        month: 0,
        year: 0
      };
      processedData.name = dataArray[0].employee_name;
      for (var i = 0; i < dataArray.length; i++) {
        if (isWithinPastWeek(dataArray[i].date)) {
          numberOfComments.week++;
          numberOfComments.month++;
          numberOfComments.year++;
        }
        // } else if (isWithinPastMonth(dataArray[i].date)) {

        // } else if () {

        // }
      }
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
      console.log('nearestFirstDayOfMonthAtMidnight', nearestFirstDayOfMonthAtMidnight);
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
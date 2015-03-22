angular
  .module('eval.dates', [])
  .factory('DateFactory', DateFactory);

function DateFactory() {
  var service = {
    getHour: getHour,
    getDay: getDay,
    getMonth: getMonth,
    sortByTime: sortByTime,
    changeTimeFormat: changeTimeFormat,
    isWithinPastDay: isWithinPastDay,
    isWithinPastWeek: isWithinPastWeek,
    isWithinPastMonth: isWithinPastMonth,
    isWithinPastYear: isWithinPastYear
  };

  return service;


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
      return datum;
    });
  }

  function isWithinPastDay(date) {
    var inPastDay = false;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var nearestMidnightDateAtMidnight = new Date(year, month, date);
    if (date > nearestMidnightDateAtMidnight) {
      inPastDay = true;
    }
    return inPastDay;
  }

  function isWithinPastWeek(date) {
    var inPastWeek = false;
    var now = new Date();
    var day = now.getDay();
    var nowDateInMilliseconds = Date.parse(now);
    var nearestSundayInMilliseconds = nowDateInMilliseconds - day * 86400000; //86400000 milliseconds in a day
    var nearestSundayDate = new Date(nearestSundayInMilliseconds);
    //generate new date using that info and 0,0,0
    var sundayYear = nearestSundayDate.getFullYear();
    var sundayMonth = nearestSundayDate.getMonth();
    var sundayDate = nearestSundayDate.getDate();
    var nearestSundayDateAtMidnight = new Date(sundayYear, sundayMonth, sundayDate);
    if (date > nearestSundayDateAtMidnight) {
      inPastWeek = true;
    }
    return inPastWeek;
  }

  function isWithinPastMonth(date) {
    var inPastMonth = false;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var nearestFirstDayOfMonthAtMidnight = new Date(year, month, 1);
    //compare if the value is greater than this one above
    if (date > nearestFirstDayOfMonthAtMidnight) {
      inPastMonth = true;
    }
    return inPastMonth;
  }

  function isWithinPastYear(date) {
    var inPastYear = false;
    var now = new Date();
    var year = now.getFullYear();
    var nearestJanuaryDateAtMidnight = new Date(year, 0, 1);
    if (date > nearestJanuaryDateAtMidnight) {
      inPastYear = true;
    }
    return inPastYear;
  }

}
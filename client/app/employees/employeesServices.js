angular
  .module('eval.employees', [])
  .factory('EmployeesFactory', EmployeesFactory);

  EmployeesFactory.$inject = [
    '$http',
    'AuthFactory',
  ];

  function EmployeesFactory ($http, AuthFactory) {

  }

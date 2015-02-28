angular
  .module('eval.dashboard', [])
  .factory('DashboardFactory', DashboardFactory);

  DashboardFactory.$inject = [
    '$http',
    'AuthFactory',
  ];

  function DashboardFactory ($http, AuthFactory) {

  }

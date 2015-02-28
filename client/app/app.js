angular
  .module('eval', [
    'eval.dashboard',
    // 'eval.employees',
    'eval.auth',
    // 'eval.navbar',
    'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  // $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url : '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
   })
   .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController'
   })
   .state('employees', {
      url: '/employees',
      templateUrl: 'app/employees/employees.html',
      controller: 'EmployeesController'
   });

  //send base url to either login or dashboard depending if user is authenticated

  $urlRouterProvider.when('', ['$state', 'AuthFactory', function($state, AuthFactory) {
    if (AuthFactory.isLoggedIn()) {
      $state.go('dashboard');
    } else {
      $state.go('login');      
    }
  }]);

  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  //$httpProvider.interceptors.push('AttachTokens');
}])




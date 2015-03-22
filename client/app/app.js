angular
  .module('eval', [
    'eval.dashboard',
    'eval.employees',
    'eval.auth',
    'eval.navbar',
    'eval.dates',
    'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  // $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/landingpage.html',
      resolve: {
        loggedIn: checkLoggedIn
      }
    })
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
      controller: 'DashboardController',
      resolve: {
        loggedIn: checkLoggedIn
      }
   })
   .state('employees', {
      url: '/employees',
      templateUrl: 'app/employees/employees.html',
      controller: 'EmployeesController',
      resolve: {
        loggedIn: checkLoggedIn
      }
   });

  //send base url to either login or dashboard depending if user is authenticated

  $urlRouterProvider.when('', ['$state', 'AuthFactory', function($state, AuthFactory) {
    if (AuthFactory.isLoggedIn()) {
      $state.go('dashboard');
    } else {
      $state.go('home');
    }
  }]);

  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  //$httpProvider.interceptors.push('AttachTokens');
}])

function checkLoggedIn($q, $timeout, $http, $location, $rootScope) {

  var deferred = $q.defer();
  $http.get('/loggedin')
    .success(function(user) {
    if (user !== 0) {
      $rootScope.currentUser = user;
      $timeout(deferred.resolve, 0);
    } else {
      $rootScope.currentUser = undefined;
      $location.path('/');
      $timeout(deferred.resolve, 0);
    }
  }).error(function(err) {
      $location.path('/');
  });

  return deferred.promise;
};




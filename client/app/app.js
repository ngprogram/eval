angular
  .module('eval', [
    'eval.dashboard',
    'eval.employees',
    'eval.auth',
    'eval.navbar',
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
      controller: 'DashboardController'
      // add resolve later
   })
   .state('employees', {
      url: '/employees',
      templateUrl: 'app/employees/employees.html',
      controller: 'EmployeesController'
      // add resolve later
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
  console.log('called');
  $http.get('/loggedin')
    .success(function(user) {
    if (user !== '0') {
      $rootScope.currentUser = user;
      console.log('signedIn');
      console.log($rootScope);
      $timeout(deferred.resolve, 0);
    } else {
      console.log('not logged in ');
      $rootScope.currentUser = undefined;
      $timeout(deferred.resolve, 0);
    }
  }).error(function(err) {
      $location.path('/');
  });

  return deferred.promise;
};




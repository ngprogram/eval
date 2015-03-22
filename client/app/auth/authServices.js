angular
  .module('eval.auth', [ ])
  .factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http', '$state'];
function AuthFactory($http, $state, $rootScope) {

  var user = {};
  var factory = {};

  factory.login = function(email, password) {
    if (!email || !password) {
      console.log('All fields are required');
      return;
    }

    var payload = {
      email: email,
      password: password
    };

    $http.post('/login', payload)
      .success(success)
      .error(error);

    function success(data, status) {
      user.email = email;
      $state.go('dashboard');
    }

    function error(data, status) {
      console.log('Incorrect email and/or password');
    }
  };

  factory.signup = function(username, businessName, email, password) {
    if (!username || !businessName || !email || !password) {
      console.log('All fields are required');
      return;
    }

    var payload = {
      username: username,
      business_name: businessName,
      email: email,
      password: password
    };

    return $http.post('/signup', payload)
      .success(success)
      .error(error);

    function success(data) {
      user.email = "";
      user.businessName = businessName;
      user.username = username;
      return data;
    }

    function error() {
      console.log('Error making new account');
    }
  };

  factory.logout = function() {
    $http.get('/logout').success(success);

    function success() {
      delete user.email;
      delete user.username;
      delete user.businessName;

      window.location.href = '/';
    }
  };

  factory.isLoggedIn = function() {
    if ($rootScope) {
      return $rootScope.currentUser !== undefined;
    }
    return false;
  };

  factory.getEmail = function() {
    return user.email;
  };

  factory.getUsername = function() {
    return user.username;
  };

  factory.getBusinessName = function() {
    return user.businessName;
  };

return factory;
}
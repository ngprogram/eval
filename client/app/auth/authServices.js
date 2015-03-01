angular
  .module('eval.auth', [ ])
  .factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http', '$state'];
function AuthFactory($http, $state, $rootScope) {

  var user = {};
  var factory = {};

  /*
    LOGIN -> attempts to login on server and invokes provided error callback if there was an error
    errorCallback should take an error message as an argument
  */
  factory.login = function(email, password, errorCallback) {
    if (!email || !password) {
      errorCallback('All fields are required');
      return;
    }

    //create payload to send to server
    var payload = {
      email: email,
      password: password
    };

    //post login information to server
    $http.post('/login', payload)
      .success(success)
      .error(error);

    //callback for successful login
    function success(data, status) {
      user.email = email;
      console.log(data);
      $state.go('dashboard');
    }

    //callback for unsuccessful login
    function error(data, status) {
      errorCallback('Incorrect email and/or password');
    }
  };

  /*
    SIGNUP -> attempts to signup on server and invokes provided error callback if there was an error
    errorCallback should take an error message as an argument
  */
  factory.signup = function(username, businessName, email, password, errorCallback) {
    if (!username || !businessName || !email || !password) {
      errorCallback('All fields are required');
      return;
    }

    //create payload to send to server
    var payload = {
      username: username,
      business_name: businessName,
      email: email,
      password: password
    };

    //post signup information to server
    return $http.post('/signup', payload)
      .success(success)
      .error(error);

    //callback for successful signup
    function success(data) {
      user.email = "";
      user.businessName = businessName;
      user.username = username;
      return data;
      // $state.go('dashboard');
    }

    //callback for unsuccessful signup
    function error() {
      errorCallback('Error making new account');
    }
  };

  /*
    LOGOUT -> attempts to login on server and invokes provided error callback if there was an error
    errorCallback should take an error message as an argument
  */
  factory.logout = function() {
    $http.get('/logout').success(success);

    //callback for successful logout
    function success() {
      delete user.email;
      delete user.username;
      delete user.businessName;

      // $location.path('/');
      window.location.href = '/';
      // $state.go('home');
    }
  };

  //checks if the user is logged in
  factory.isLoggedIn = function() {
    if ($rootScope) {
      return $rootScope.currentUser !== undefined;
    }
    return false;
  };

  //gets the user's email address
  factory.getEmail = function() {
    return user.email;
  };

  //gets the user's username
  factory.getUsername = function() {
    return user.username;
  };

  //gets the user's business name
  factory.getBusinessName = function() {
    return user.businessName;
  };

  return factory;
}
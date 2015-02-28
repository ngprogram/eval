angular
  .module('eval.auth')
  .controller('AuthController', AuthController);

AuthController.$inject = ['$scope', '$location', '$http', '$state', 'AuthFactory'];
function AuthController($scope, $location, $http, $state, AuthFactory) {

  $scope.hasError = false;
  $scope.errorMessage = '';
  //send the login information to the server if valid
  $scope.submitLogin = function(email, password) {
    if (email && password) {
      AuthFactory.login(email, password, function(errorMessage) {
        $scope.hasError = true;
        $scope.errorMessage = errorMessage;
      });
    }
  };

  $scope.submitSignup = function(username, businessName, email, password) {
    if (username && businessName && email  && password) {
      AuthFactory.signup(username, businessName, email, password, function(errorMessage) {
        $scope.hasError = true;
        $scope.errorMessage = errorMessage;
      });
    }
  };

}

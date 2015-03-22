angular
  .module('eval.auth')
  .controller('AuthController', AuthController);

AuthController.$inject = ['$scope', '$location', '$http', '$state', 'AuthFactory'];
function AuthController($scope, $location, $http, $state, AuthFactory) {

  $scope.hasError = false;
  $scope.errorMessage = '';

  $scope.submitLogin = function(email, password) {
    if (email && password) {
      AuthFactory.login(email, password, function(errorMessage) {
        $scope.hasError = true;
        $scope.errorMessage = errorMessage;
      });
    }
  };

  $scope.isLoggedIn = function() {
    return AuthFactory.isLoggedIn();
  }

  $scope.submitSignup = function(username, businessName, email, password) {
    if (username && businessName && email  && password) {
      AuthFactory.signup(username, businessName, email, password, function(errorMessage) {
        $scope.hasError = true;
        $scope.errorMessage = errorMessage;
      })
      .success(function() {
        $scope.email = "";
        $scope.username = "";
        $scope.password = "";
        $scope.businessName = "";
        $scope.hasEmailBeenSent = true;
      });
    }
  };

}

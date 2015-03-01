angular
  .module('eval.navbar')
  .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$scope', '$http', 'AuthFactory'];
function NavbarController($scope, $http, AuthFactory) {
  $scope.user = {};
  $scope.isLoggedIn = function() {
    return $scope.currentUser !== undefined;
  }

  $scope.user.logout = function() {
    AuthFactory.logout();
  };
}

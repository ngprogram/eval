angular
  .module('eval.navbar')
  .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$scope', '$http', 'AuthFactory', '$rootScope'];
function NavbarController($scope, $http, AuthFactory, $rootScope) {
  $scope.user = {};
  $scope.isLoggedIn = function() {
    return $rootScope.currentUser !== undefined;
  }
  $scope.user.logout = function() {
    AuthFactory.logout();
  };
}

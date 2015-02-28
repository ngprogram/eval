angular
  .module('eval.navbar')
  .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$scope', '$http', 'AuthFactory'];
function NavbarController($scope, $http, AuthFactory) {
  $scope.user = {};
  // $scope.user.email = AuthFactory.getEmail();

  $scope.user.logout = function() {
    AuthFactory.logout();
  };
}

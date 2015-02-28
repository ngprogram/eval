angular
  .module('eval.navbar')
  .directive('ngNavbar', navbar);

function navbar() {
  return {
    templateUrl: './app/navbar/navbar.html',
    scope: {},
    controller: 'NavbarController'
  };
}
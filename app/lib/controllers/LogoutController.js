angular.module('restServer').controller('LogoutController', ['$scope', 'userService', '$location', function($scope, userService, $location) {

  userService.logout()
    .then(function() {
      console.log('logged out user');
      $location.path('/');
    }, function(err) {
      console.log('Error:', err);
    });

}]);
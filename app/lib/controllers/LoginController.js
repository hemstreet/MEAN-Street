angular.module('restServer').controller('LoginController', ['$scope', 'userService', '$location', function($scope, userService, $location) {

    var vm = this;

    vm.pageName = 'Login';

    vm.data = null;

    vm.loginUser = function(data) {
        userService.authenticate({
            username: data.username,
            password: data.password
        }).then(function(data) {
            $location.path('/dashboard');
        }, function(err) {
            vm.error = err;
        });
    };
}]);
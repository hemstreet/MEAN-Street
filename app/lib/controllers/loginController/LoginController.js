angular.module('restServer').controller('LoginController', ['$scope', 'userService', function($scope, userService) {

    var vm = this;

    vm.pageName = 'Login';

    vm.data = null;

    vm.loginUser = function(data) {
        userService.authenticate({
            username: data.username,
            password: data.password
        }).then(function(data) {
            vm.data = data
        }, function(err) {
            vm.data = err;
            console.log('ERROR:', err);
        });
    };
}]);
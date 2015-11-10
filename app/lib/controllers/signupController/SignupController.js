angular.module('restServer').controller('SignupController', ['$scope', 'userService', function($scope, userService) {

    var vm = this;

    vm.pageName = 'Signup';

    vm.data = null;

    vm.signupUser = function(data) {
        userService.signup({
            username: data.username,
            password: data.password
        }).then(function(data) {
            vm.data = data;

            // @todo do proper redirect for dashboard
            window.location.href = "#/dashboard";
        }, function(err) {
            vm.data = err;
            console.log('ERROR:', err);
        });
    };

}]);
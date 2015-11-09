angular.module('restServer').controller('LoginController', ['$scope', 'userService', function($scope, userService) {

    var vm = this;

    vm.pageName = 'Login';

    console.log('Login Controller');

    userService.authenticate({
        username: 'sdf',
        password: 'sdf'
    });
}]);
angular.module('restServer').controller('SignupController', ['$scope', 'userService', function($scope, userService) {

    var vm = this;

    vm.pageName = 'Signup';

    console.log('Signup Controller');

    userService.signup({
        username: 'sdf',
        password: 'sdf'
    });
}]);
angular.module('restServer').controller('DashboardController', ['$scope', 'userService', function($scope, userService) {

    var vm = this;

    vm.logoutUser = function() {
        userService.logout();
    };
}]);
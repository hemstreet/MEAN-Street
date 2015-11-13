angular.module('restServer').controller('DashboardController', ['$scope', 'httpService', function ($scope, httpService) {

    var vm = this;

    httpService.getModels().then(function(models) {
        vm.models = models;
    });

}]);
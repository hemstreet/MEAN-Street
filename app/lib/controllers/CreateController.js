angular.module('restServer').controller('CreateController', ['$scope', '$routeParams', 'httpService', function ($scope, $routeParams, httpService) {

    var vm = this;

    vm.pageName = "Create";

    vm.modelName = $routeParams.model;
}]);
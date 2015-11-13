angular.module('restServer').controller('ListController', ['$scope', '$routeParams', 'httpService', function ($scope, $routeParams, httpService) {

    var vm = this;

    vm.pageName = 'List Controller';
    vm.fields = null;

    var modelName = $routeParams.model;

    vm.modelName = modelName;

    httpService.getModelFields({
        modelName: modelName
    }).then(function (fields) {
        vm.fields = fields;
    });

    httpService.list({
        modelName: modelName
    }).then(function (response) {
        vm.models = response.data;
    });

}]);
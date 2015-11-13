angular.module('restServer').controller('CreateController', ['$scope', '$routeParams', 'httpService', function ($scope, $routeParams, httpService) {

    var vm = this,
        modelName = $routeParams.model;

    vm.pageName = 'Create Controller';
    vm.action = 'create';

    vm.model = {
        modelName: modelName,
        fields: null,
        schema: null
    };

    httpService.getModelFields({
        modelName: modelName,
        protected: true
    }).then(function (data) {
        vm.model.fields = data
    }, function (err) {
        vm.err = err;
    });

    httpService.getModelSchema({
        modelName: modelName
    }).then(function (data) {
        vm.model.schema = data;
    }, function (err) {
        vm.err = err;
    });

}]);
angular.module('restServer').controller('ListController', ['$scope', '$routeParams', 'httpService', function ($scope, $routeParams, httpService) {

    var vm = this;

    vm.pageName = 'List Controller';
    vm.fields = null;

    var modelName = $routeParams.model;

    httpService.getModelFields({
        modelName: modelName
    }).then(function (fields) {
        vm.fields = fields;
    });

    httpService.list({
        modelName: modelName
    }).then(function (response) {
        vm.modelName = modelName;
        vm.models = response.data;
    });

    this.editModel = function (_id, data) {
        console.log('edit', _id, data);
    };

    this.deleteModel = function (_id) {
        httpService.delete({
            modelName: modelName,
            _id: _id
        }).then(function (response) {
            angular.element.find('.' + _id)[0].remove();
        }, function (err) {
            console.log(err)
        });

    };

    this.createModel = function (model) {
        console.log('create', model);

    };

}]);
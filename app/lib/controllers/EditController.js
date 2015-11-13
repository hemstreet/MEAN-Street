angular.module('restServer').controller('EditController', ['$routeParams', 'httpService', function ($routeParams, httpService) {

    var vm = this,
        modelName = $routeParams.model,
        _id = $routeParams._id;

    vm.pageName = 'Edit Controller';
    vm.action = 'update';

    vm.model = {
        modelName: modelName,
        _id: _id,
        fields: null,
        schema: null,
        modelData: null
    };

    httpService.read({
        modelName: modelName,
        _id: _id
    }).then(function (response) {
        vm.model.modelData = response.data
    }, function (err) {
        vm.err = err;
    });

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
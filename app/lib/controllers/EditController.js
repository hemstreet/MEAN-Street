angular.module('restServer').controller('EditController', ['$routeParams', 'httpService', function ($routeParams, httpService) {

    var vm = this;

    var modelName = $routeParams.model,
        _id = $routeParams._id;

    vm.pageName = 'Edit Controller';
    vm.modelFields = null;

    vm.modelName = modelName;
    vm.modelId = _id;

    httpService.getModelFields({
        modelName: modelName,
        protected: true
    }).then(function (data) {
        vm.fields = data
    }, function (err) {
        vm.err = err;
    });

    httpService.getModelSchema({
        modelName: modelName
    }).then(function (data) {
        vm.modelSchema = data;
    }, function (err) {
        vm.err = err;
    });

    vm.editModel = function (_id, data) {

        console.log(_id, data);
        httpService.update({
            modelName: modelName,
            id: _id,
            data: data

        }).then(function (response) {

        }, function (err) {
            vm.error = err;
        });
    }

}]);
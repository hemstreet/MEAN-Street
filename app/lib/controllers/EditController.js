angular.module('restServer').controller('EditController', ['$routeParams', 'httpService', function($routeParams, httpService) {

    var vm = this;

    vm.pageName = 'Edit Controller';
    vm.modelFields = null;

    var modelName = $routeParams.model,
        _id = _id;

    httpService.getModelSchema({
        modelName: modelName
    }).then(function(data) {
        vm.modelSchema = data;
    }, function(err){
        vm.err = err;
    });

    vm.editModel = function(data) {
        httpService.update({
            modelName: modelName,
            id: _id,
            data: data

        }).then(function(response) {

        }, function(err) {
            vm.error = err;
        });
    }

}]);
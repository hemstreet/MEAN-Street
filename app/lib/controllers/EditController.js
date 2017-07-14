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
        fileFields: [],
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
        vm.model.fields = data;

    }, function (err) {
        vm.err = err;
    });

    httpService.getModelSchema({
        modelName: modelName
    }).then(function (data) {
        vm.model.schema = data;

        let fieldKeys = Object.keys(vm.model.schema);

        fieldKeys.forEach(field => {
            if(vm.model.schema[field].fieldType === 'file') {
                vm.model.fileFields.push(field);
            }
        });

    }, function (err) {
        vm.err = err;
    });

}]);
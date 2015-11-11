angular.module('restServer').controller('ListController', ['$scope', '$routeParams', 'httpService', function($scope, $routeParams, httpService) {

    var vm = this;

    vm.pageName = 'List Controller';

    var modelName = $routeParams.model;
    httpService.list({
        model: modelName
    }).then(function(response) {
        vm.modelName = modelName;
        vm.models = response.data;
    });

    this.editModel = function(_id) {
        console.log('edit', _id);
    };

    this.deleteModel = function(_id) {
        console.log('delete', _id);
    };

    this.createModel = function(model) {
        console.log('create', model);

    };

}]);
angular.module('restServer').controller('EditController', ['$scope', 'modelService', function($scope, modelService) {

    var vm = this;

    vm.pageName = 'Edit Controller';

    console.log('Edit Controller');

    modelService.edit({});
}]);
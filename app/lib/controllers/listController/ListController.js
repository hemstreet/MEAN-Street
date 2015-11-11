angular.module('restServer').controller('ListController', ['$scope', 'httpService', function($scope, httpService) {

    var vm = this;

    vm.pageName = 'List Controller';

    httpService.list({
        model: 'user'
    }).then(function(response) {
        vm.models = response.data;
    });

}]);
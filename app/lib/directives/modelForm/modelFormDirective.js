angular.module('restServer').directive('modelForm', ['httpService', function (httpService) {
    return {
        restrict: 'E',
        scope: {
            modelName: '=',
            modelId: '=',
            schema: '=',
            fields: '=',
            controller: '='
        },
        templateUrl: './lib/directives/modelForm/modeForm.html'
    }
}]);
angular.module('restServer').directive('modelList', ['httpService', function (httpService) {
    return {
        restrict: 'E',
        scope: {
            models: '=',
            controller: '=',
            modelName: '=',
            fields: '='
        },

        templateUrl: './lib/directives/modelList/modelList.html',
        controller: function ($scope) {

            $scope.delete = function (_id) {
                httpService.delete({
                    modelName: $scope.modelName,
                    _id: _id
                }).then(function (response) {
                    angular.element.find('.' + _id)[0].remove();
                }, function (err) {
                    console.log(err)
                });
            };

        }
    }
}]);
angular.module('restServer').directive('modelForm', ['httpService', function (httpService) {
    return {
        restrict: 'E',
        scope: {
            modelName: '=',
            modelId: '=',
            schema: '=',
            fields: '=',
            formData: '=',
            action: '='
        },
        templateUrl: './lib/directives/modelForm/modeForm.html',
        controller: function ($scope) {

            // Update action to be for edit vs create
            $scope.formData = [];
            $scope.submitForm = function (modelName, _id, data) {
                httpService.update({
                    modelName: modelName,
                    _id: _id,
                    data: data
                }).then(function(response) {
                    $scope.response = response.data.message;
                }, function(err) {
                    $scope.response = err
                });
            };
        }
    }
}]);
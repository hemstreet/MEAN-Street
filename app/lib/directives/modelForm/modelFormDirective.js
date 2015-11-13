angular.module('restServer').directive('modelForm', ['httpService', function (httpService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            action: '='
        },
        templateUrl: './lib/directives/modelForm/modelForm.html',
        controller: function ($scope) {
            $scope.submitForm = function () {

                var fieldData = $scope.model.formData;
                if($scope.model.modelData && $scope.model.formData) {
                    // Map our form values to our current model incase any values are missing
                    fieldData = angular.extend({}, $scope.model.modelData, $scope.model.formData);
                }

                var options = {
                    _id: $scope.model._id,
                    modelName: $scope.model.modelName,
                    data: fieldData
                };

                httpService[$scope.action](options)
                    .then(function(response) {
                        $scope.response = response.data.message;
                    }, function(err) {
                        $scope.response = err
                    });
            };
        }
    }
}]);
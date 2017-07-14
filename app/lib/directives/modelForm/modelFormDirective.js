angular.module('restServer').directive('modelForm', ['$parse', 'config', 'httpService', function ($parse, config, httpService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            action: '='
        },
        templateUrl: './lib/directives/modelForm/modelForm.html',
        controller: function ($scope) {

            console.log($scope);
            $scope.url = config.baseUrl + '/create/' + $scope.model.modelName;

            // $scope.$watch('model', (newValue) => {
            //     if(newValue.fileFields.length > 0) {
            //         newValue.fileFields.forEach(field => {
            //             $scope[field] = new FileUploader();
            //         })
            //     }
            // }, true);

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
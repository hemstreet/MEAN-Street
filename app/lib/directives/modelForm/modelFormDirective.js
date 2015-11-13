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

            $scope.submitForm = function (modelName, _id, data) {
                var options = {
                    modelName: modelName,
                    data: data
                };

                if($scope.action == 'edit') {

                    options._id = _id;

                    httpService.update(options)
                        .then(function(response) {
                            $scope.response = response.data.message;
                        }, function(err) {
                            console.log('update');
                            $scope.response = err
                        });
                }
                else
                {
                    httpService.create(options)
                        .then(function(response) {
                            console.log(response);
                        }, function(err) {
                            console.log('create');
                            console.log(err);
                        })
                }
            };
        }
    }
}]);
angular.module('restServer').directive('modelForm', ['httpService', function (httpService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            formData: '=',
            action: '='
        },
        templateUrl: './lib/directives/modelForm/modeForm.html',
        controller: function ($scope) {
            $scope.submitForm = function () {

                console.log($scope.formData);
                //var options = {
                //    _id: $scope.model._id,
                //    modelName: $scope.model.modelName,
                //    data: data
                //};

                //httpService[$scope.action](options)
                //    .then(function(response) {
                //        $scope.response = response.data.message;
                //    }, function(err) {
                //        $scope.response = err
                //    });
            };
        }
    }
}]);
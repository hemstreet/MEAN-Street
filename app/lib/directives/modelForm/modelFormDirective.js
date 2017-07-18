angular.module('restServer').directive('modelForm', ['$parse', 'config', 'httpService', function ($parse, config, httpService) {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            action: '='
        },
        templateUrl: './lib/directives/modelForm/modelForm.html',
        controller: function ($scope) {

            $scope.formAction = 'post';
            $scope.method = 'POST';
            let model = $scope.model.modelName.toLowerCase();

            if ($scope.action  === 'update') {
                $scope.method = 'PUT';
                model += `/${$scope.model._id}`
            }

            $scope.url = `${config.baseUrl}/${$scope.action}/${model}`;

            $scope.submitForm = function (event) {
                event.preventDefault();

                let form = $(this);
                // You need to use standart javascript object here
                var formData = new FormData(form);

                $.ajax({
                    url: $scope.url,
                    data: formData,
                    type: $scope.method.toUpperCase(),
                    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                    processData: false, // NEEDED, DON'T OMIT THIS
                    success: response => {
                        console.log(response);
                    }
                    // ... Other options like success and etc
                });
                // $.ajax({
                //     url: $scope.url,
                //     type: ,
                //     data: $scope.model.formData,
                //     success: function(result) {
                //         console.log('success', result);
                //     }
                // });
            };
        }
    }
}]);
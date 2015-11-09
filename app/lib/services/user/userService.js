angular.module('restServer').service('userService', ['$http', 'config', function ($http, config) {

    this.authenticate = function (options) {
        console.log('test authentication service');
    };

    this.signup = function (data) {

        $http.post(config.baseUrl + '/signup', data).then(function(response) {
            console.log(response);
        }, function(err) {
            console.log('Error', err);
        });
    };

}]);
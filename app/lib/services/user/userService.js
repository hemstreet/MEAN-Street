angular.module('restServer').service('userService', ['$http', 'config', '$q', 'ipCookie', function ($http, config, $q, ipCookie) {

    this.authenticate = function (data) {
        var defer = $q.defer();

        $http.post(config.baseUrl + '/authenticate', data).then(function(response) {
            this.setCookie(data.token);
            defer.resolve(response);
        }.bind(this), function(err) {
            defer.reject(err);
        });

        return defer.promise;
    };

    this.signup = function (data) {

        var defer = $q.defer();

        $http.post(config.baseUrl + '/signup', data).then(function(response) {

            this.setCookie(data.token);
            defer.resolve(response);
        }.bind(this), function(err) {
            defer.reject(err);
        });

        return defer.promise;
    };

    this.logout = function() {
        // Remove cookie config.token.name
    };

    this.setCookie = function(token) {

        //var expireDate = new Date();
        //expireDate.setDate(expireDate.getDate() + 365);
        console.log('setting cookie');
        ipCookie(config.token.name, token, { expires: 365 });
    }

}]);
angular.module('restServer').service('userService', ['$http', 'config', '$q', 'ipCookie', function ($http, config, $q, ipCookie) {

    this.authenticate = function (data) {
        var defer = $q.defer();

        $http.post(config.baseUrl + '/authenticate', data).then(function(response) {
            console.log(response);
            this.setCookie(config.token.name, response.data.token);
            defer.resolve(response);
        }.bind(this), function(err) {
            defer.reject(err);
        });

        return defer.promise;
    };

    this.signup = function (data) {

        var defer = $q.defer();

        $http.post(config.baseUrl + '/signup', data).then(function(response) {
            this.setCookie(config.token.name, response.data.token);
            defer.resolve(response);
        }.bind(this), function(err) {
            defer.reject(err);
        });

        return defer.promise;
    };

    this.logout = function() {
        ipCookie.remove(config.token.name);
        window.location.href = "/";
    };

    this.setCookie = function(name, value) {
        ipCookie(name, value, {
            expires: config.token.expiration
        });
    };
}]);
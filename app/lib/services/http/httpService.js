angular.module('restServer').service('httpService', ['$http', 'config', '$q', function($http, config, $q) {

  this.create = function(options) {

    var defer = $q.defer();

    $http.post(config.baseUrl + '/create/' + options.model + '/', options.data).then(function(response) {
      defer.resolve(response);
    }.bind(this), function(err) {
      defer.reject(err);
    });

    return defer.promise;

  };

  this.read = function(options) {

    var defer = $q.defer();

    $http.get(config.baseUrl + '/read/' + options.model + '/' + options._id).then(function(response) {
      defer.resolve(response);
    }.bind(this), function(err) {
      defer.reject(err);
    });

    return defer.promise;

  };

  this.update = function(options) {
    var defer = $q.defer();

    $http.put(config.baseUrl + '/update/' + options.model + '/' + options._id, options.data).then(function(response) {
      defer.resolve(response);
    }.bind(this), function(err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  this.delete = function(options) {
    var defer = $q.defer();

    $http.delete(config.baseUrl + '/update/' + options.model + '/' + options._id).then(function(response) {
      defer.resolve(response);
    }.bind(this), function(err) {
      defer.reject(err);
    });

    return defer.promise;

  };

  this.list = function(options) {
    var defer = $q.defer();

    console.log(options);

    $http.get(config.baseUrl + '/list/' + options.model).then(function(response) {
      defer.resolve(response);
    }.bind(this), function(err) {
      defer.reject(err);
    });

    return defer.promise;
  }

}]);
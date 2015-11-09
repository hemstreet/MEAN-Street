angular.module('restServer').service('userService', function() {

    this.authenticate = function(options) {
        console.log('test authentication service');
    };

    this.signup = function(options) {
        console.log('test signup service');
    };

});
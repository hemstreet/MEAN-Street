var q = require('q');

var Normalize = function() {

};

Normalize.prototype.go = function(drink) {
    var deferred = q.defer();

    this.ingredient(drink).then(function(drink) {

    });

    return deferred.promise;
};

Normalize.prototype.ingredient = function(drink) {
    var deferred = q.defer();



    return deferred.promise;

};

module.exports = new Normalize();
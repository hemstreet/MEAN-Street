var _ = require('underscore'),
    Model = require('./Model'),
    model = new Model(),
    q = require('q');

var Search = function(options) {
    this.config = options;
}

Search.prototype.find = function (modelName, field, query) {

    var defer = q.defer();
    model.getModels().then(function(models) {
        defer.resolve(models['modelName'].find({field: /query/i}));
    }).fail(function(err) {
        console.log(err);
        defer.reject(err);
    })
    return defer.promise;
};

module.exports = Search;
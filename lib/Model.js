"use strict";

var _ = require('lodash'),
    glob = require('glob'),
    q = require('q');

var Model = function(config) {
    this.config = config;
    this.modelPath = (config && config.modelPath) ? config.modelPath : __dirname + '/models/';
    this.models = {};
};

Model.prototype.getModelName = function(modelName) {
    return _.capitalize(modelName);
};

Model.prototype.getModel = function(name) {
    return require(__dirname + '/models/' + name);
};

Model.prototype.getModels = function() {

    var defer = q.defer();

    // Autoload Models
    glob(this.modelPath + '*', function (err, files) {

        if(err) {
            return err;
        }

        _.forEach(files, function(filePath) {

            var chunks = filePath.split('/'),
                fileName = chunks[chunks.length - 1],
                modelName = fileName.split('.')[0];

            this.models[this.getModelName(modelName)] = require(this.modelPath + modelName);
        }.bind(this));

        this.models[this.getModelName('user')] = this.getModel('user');

        defer.resolve(this.models);

    }.bind(this));

    return defer.promise;

};

Model.prototype.getSchema = function(options) {

    //@TODO: Sorry for this poop
    var modelName = options.modelName.toLowerCase(),
        path = this.modelPath + '../schemas/';

    if(modelName === "user") {
        path = __dirname + '/schemas/';
    }

    return require(path + options.modelName.toLowerCase() + '.json');

};

Model.prototype.getFields = function(options) {

    var schema = this.getSchema(options),
        _fields = Object.keys(schema),
        fields = [];

    _.each(_fields, function(value) {
        if(value.charAt('0') !== '_') {
            fields.push(value);
        }
    });

    fields.unshift('_id');

    return fields;
};


module.exports = Model;
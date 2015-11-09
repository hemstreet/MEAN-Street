var _ = require('lodash');
var Form = function() {
};

Form.prototype.getSchema = function(_schema) {

    var schema = {};

    _.forEach(_schema, function(value, key) {

        schema[key] = value.type;
    });

    return schema;
};

module.exports = new Form();
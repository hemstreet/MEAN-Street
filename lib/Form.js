var _ = require('lodash');

var Form = function(options) {
};

Form.prototype.getModelSchema = function(modelName) {
    var schema = require('./schemas/' + modelName + '.json');

    return schema;
};

module.exports = Form;
var mongoose = require('mongoose'),
    testSchema = require('../schemas/test.json'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = mongoose.model('Test', new Schema(testSchema));
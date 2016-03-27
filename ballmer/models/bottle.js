var mongoose = require('mongoose'),
    bottleSchema = require('../schemas/bottle.json'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = mongoose.model('Bottle', new Schema(bottleSchema));
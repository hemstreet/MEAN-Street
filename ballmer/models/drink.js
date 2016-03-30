var mongoose = require('mongoose'),
    drinkSchema = require('../schemas/drink.json'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = mongoose.model('Drink', new Schema(drinkSchema));
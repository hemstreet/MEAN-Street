var mongoose = require('mongoose'),
    userSchema = require('../schemas/user.json'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    form = require('../../lib/form.js'),
    modelSchema = form.getSchema(userSchema);

module.exports = mongoose.model('User', new Schema(modelSchema));
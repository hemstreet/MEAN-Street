var mongoose = require('mongoose'),
    userSchema = require('../schemas/user.json'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = mongoose.model('User', new Schema(userSchema));
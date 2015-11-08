var mongoose = require('mongoose'),
    baseSchema = require('../schemas/base.json'),
    userSchema = require('../schemas/user.json'),
    Schema = mongoose.Schema,
    _ = require('lodash');

module.exports = mongoose.model('User', new Schema(_.extend(baseSchema, userSchema)));
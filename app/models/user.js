//http://mongoosejs.com/docs/2.7.x/docs/schematypes.html

var mongoose = require('mongoose'),
    userSchema = require('../schemas/user.json'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema(userSchema));
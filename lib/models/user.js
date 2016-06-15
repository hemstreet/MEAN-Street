var mongoose = require('mongoose'),
    userSchema = require('../schemas/user.json'),
    Schema = mongoose.Schema,
    Auth = require('../Auth'),
    auth = new Auth(),
    schema = new Schema(userSchema);

schema.pre('save', function(next) {
    this.password = auth.generateHash(this.password);
    next();
});

module.exports = mongoose.model('User', schema);
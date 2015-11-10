var _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config'),
    passwordHash = require('password-hash');

var Auth = function(options) {
};

Auth.prototype.verify = function(password, hash, cb) {
    return jwt.verify(password, hash, cb);
};

Auth.prototype.sign = function(user) {

    var token =  jwt.sign(user, config.secret, {
        expiresIn: config.token.expiration
    });
    return token;
};

Auth.prototype.generateHash = function(password) {
    return passwordHash.generate(password);
};

Auth.prototype.verifyHash = function(password, hash) {
    return passwordHash.verify(password, hash);
};

module.exports = Auth;
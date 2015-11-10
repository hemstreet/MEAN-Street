var _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config'),
    passwordHash = require('password-hash');

var Auth = function(options) {
};

Auth.prototype.verify = function(password, hash, cb) {

    var verify = passwordHash.verify(password, hash);

    (cb) ? cb() : '';

    return verify;
};

Auth.prototype.sign = function(user) {

    var token =  jwt.sign(user, config.secret, {
        expiresIn: config.token.expiration
    });
    return token;
};

Auth.prototype.generateHash = function(password) {
    var hash = passwordHash.generate(password);
    console.log(hash);
    return hash;
};

module.exports = Auth;
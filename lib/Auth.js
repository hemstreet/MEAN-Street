"use strict";

var jwt = require('jsonwebtoken'),
    passwordHash = require('password-hash');

var Auth = function (config) {
    this.config = config;
};

Auth.prototype.verify = function (password, hash, cb) {
    return jwt.verify(password, hash, cb);
};

Auth.prototype.sign = function (user) {
    return jwt.sign(user, this.config.secret, {
        expiresIn: this.config.token.expiration
    });
};

Auth.prototype.generateHash = function (password) {
    return passwordHash.generate(password);
};

Auth.prototype.verifyHash = function (password, hash) {
    return passwordHash.verify(password, hash);
};

module.exports = Auth;
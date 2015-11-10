var _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config'),
    passwordHash = require('password-hash'),
    cookieParser = require('cookie-parser');

var Auth = function(options) {

};

Auth.prototype.verify = function(password, _password) {
    return passwordHash.verify(password, _password);
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

module.exports = Auth;
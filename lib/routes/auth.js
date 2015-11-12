var _ = require('lodash');

module.exports = function (options) {

    var router = options.router,
        auth = options.auth,
        config = options.config;

    router.use(function (req, res, next) {

        var token = req.headers['x-access-token'] || req.cookies[config.token.name];

        if (token) {
            auth.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Failure to authenticate token'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
};
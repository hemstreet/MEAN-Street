"use strict";

var _ = require('lodash');

module.exports = function (options) {

    var router = options.router,
        models = options.models,
        auth = options.auth;

    router.route('/authenticate')
        .post(function (req, res) {
            models.User.findOne({
                    "username": req.body.username
                },
                function (err, user) {
                    if (err) {
                        res.send(err);
                    }

                    if (!user) {
                        res.json({message: "Authentication failed. User not found", success: false});
                    }
                    else if (user) {

                        if (auth.verifyHash(req.body.password, user.password)) {

                            var token = auth.sign(user);

                            res.send({
                                success: true,
                                message: 'Authentication successful for ' + user.username,
                                token: token
                            });
                        }
                        else {
                            res.send({message: "Authentication failed. Invalid password", success: false});
                        }
                    }
                }
            );
        });

    router.route('/signup')
        .post(function (req, res) {

            var Model = models.User,
                model = new Model(),
                modelSchema = model.schema.paths,
                token = null;

            _.forEach(Object.keys(modelSchema), function (n) {

                if (n[0] !== '_') {
                    if (req.body[n]) {
                        model[n] = req.body[n];
                    }
                }
            });

            model.password = auth.generateHash(req.body.password);

            model.save(function (err) {
                if (err) {
                    res.send(err);
                }

                token = auth.sign(model);

                res.json({
                    success: true,
                    message: "User Created",
                    model: model,
                    token: token
                });
            });

        });
};
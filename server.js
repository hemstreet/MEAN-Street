var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    config = require('./config/config'),
    _ = require('lodash'),
    Model = require('./lib/model.js'),
    modellUtil = new Model(),
    passwordHash = require('password-hash'),
    form = require('./lib/form.js');

var BASELIB = __dirname + '/lib';

app.set('models', BASELIB + '/models');

// Models
var _models = modellUtil.getModels();

_models.then(function (models) {
    mongoose.connect(config.database);
    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/', express.static(__dirname + '/app'));
    app.use('/v1/rest', router);

    app.get('/', function (req, res) {
        res.sendFile('/index.html');
    });

    router.route('/authenticate')
        .post(function (req, res) {
            models['User'].findOne({
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
                        if (passwordHash.verify(req.body.password, user.password)) {

                            // @todo break out into helper method
                            var token = jwt.sign(user, config.secret, {
                                expiresIn: config.tokenExpiration
                            });

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
            )
        });

    router.route('/signup')
        .post(function (req, res) {

            var Model = models['User'],
                model = new Model(),
                modelSchema = model.schema.paths;

            _.forEach(Object.keys(modelSchema), function (n) {

                if (n[0] !== '_') {
                    if (req.body[n]) {
                        model[n] = req.body[n];
                    }
                }
            });

            model.password = passwordHash.generate(req.body.password);

            model.save(function (err) {
                if (err) {
                    res.send(err);
                }

                // @todo break out into helper method
                var token = jwt.sign(model, config.secret, {
                    expiresIn: config.tokenExpiration
                });

                res.json({
                    success: true,
                    message: "User Created",
                    model: model,
                    token: token
                });
            })

        });

    router.use(function (req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
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

    router.route('/:model/:_id')
        .get(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }

                res.json(entry);
            })
        })
        .put(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }

                entry.save(function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        success: true,
                        message: model + " Updated",
                        entry: entry
                    });
                })
            })
        })
        .delete(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model),
                Model = models[modelName];

            Model.findById(req.params._id, function (err, entry) {
                Model.remove({
                    _id: req.params._id
                }, function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        success: true,
                        message: model + " Deleted"
                    });
                });
            });
        });

    router.route('/:model')

        .post(function (req, res) {

            var modelName = modellUtil.getModelName(req.params.model),
                Model = models[modelName];

            var model = new Model(),
                modelSchema = model.schema.paths;

            _.forEach(Object.keys(modelSchema), function (n) {

                if (n[0] !== '_') {
                    if (req.body[n]) {
                        model[n] = req.body[n];
                    }
                }
            });

            model.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({
                    success: true,
                    message: modelName + " Created",
                    model: model
                });
            })
        })

        .get(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].find(function (err, entries) {
                if (err) {
                    res.send(err);
                }

                res.json(entries);
            });
        });

    app.listen(port);

    console.log('REST server listening on port', port);
});
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    config = require('./app/config/config'),
    _ = require('lodash'),
    Model = require('./lib/model.js'),
    modellUtil = new Model(),
    cons = require('consolidate'),
    viewEngine = 'ejs';

app.engine('html', cons[viewEngine]);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

// @TODO change modelPath to be passed in via args
// Models
var _models = modellUtil.getModels();

_models.then(function( models) {
    mongoose.connect(config.database);
    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());

    app.use(morgan('dev'));

    router.route('/authenticate')
        .post(function (req, res) {
            models['User'].findOne({
                    "name": req.body.name
                },
                function (err, user) {
                    if (err) {
                        res.send(err);
                    }

                    if (!user) {
                        res.json({message: "Authentication failed. User not found", success: false});
                    }
                    else if (user) {
                        if (user.password != req.body.password) {
                            res.send({message: "Authentication failed. Invalid password", success: false});
                        }
                        else {
                            // Expires in 1 year
                            var token = jwt.sign(user, config.secret, {
                                expiresIn: 60 * 60 * 24 * 7 * 52
                            });

                            res.send({
                                success: true,
                                message: 'Authentication successful for ' + user.name,
                                token: token
                            });
                        }
                    }
                }
            )
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

    router.route('/health')

        .get(function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send({message: "Health Check Passed"});
        });

    router.route('/view/:model/:_id')
        .get(function (req, res) {
            var modelName = modellUtil.getModelName(req.params.model);

            models[modelName].findById(req.params._id, function (err, entry) {
                if (err) {
                    res.send(err);
                }

                res.render('forms/form', {
                    title: entry.name,
                    entry: entry
                });

            })
        });

    router.route('/edit/:model/:_id')
        .get(function (req, res) {

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

                entry.name = req.body.name;

                entry.save(function (err) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        success: true,
                        message: model + " Updated",
                        user: user
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


    app.use('/v1/rest', router);

    app.listen(port);
    console.log('REST server listening on port', port);
});
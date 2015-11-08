var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    config = require('./app/config/config'),
    glob = require('glob'),
    _ = require('lodash');

// Models
var modelPath = './app/models/',
    models = {};

// Autoload Models
glob(modelPath + '*', function (err, files) {

    if(err) {
        return err;
    }

    _.forEach(files, function(filePath) {
        var chunks = filePath.split('/'),
            fileName = chunks[chunks.length - 1],
            modelName = fileName.split('.')[0];

        models[_.capitalize(modelName)] = require(modelPath + modelName);
    });

});

var getModelNameFromParam = function(param) {

    return _.capitalize(param);

};

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
        res.send({ message: "Health Check Passed" });
    });

router.route('/:model/:_id')
    .get(function (req, res) {
        var modelName = getModelNameFromParam(req.params.model);

        models[modelName].findById(req.params._id, function (err, entry) {
            if (err) {
                res.send(err);
            }

            res.json(entry);
        })
    })
    .put(function (req, res) {
        var modelName = getModelNameFromParam(req.params.model);

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
        var modelName = getModelNameFromParam(req.params.model),
            Model = models[modelName];

        Model.findById(req.params._id, function (err, entry) {
            Model.remove({
                _id: req.params._id
            }, function (err, entry) {
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

        var modelName = getModelNameFromParam(req.params.model),
            Model = models[modelName];

        var model = new Model();
        //user.name = req.body.name;
        //user.password = req.body.password;

        model.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({
                success: true,
                message: modelName + "Created",
                model: model
            });
        })
    })

    .get(function (req, res) {
        var modelName = getModelNameFromParam(req.params.model);

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
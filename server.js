var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    config = require('./app/config/config');

// Models
var User = require('./app/models/user');

mongoose.connect(config.database);
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

router.route('/authenticate')
    .post(function (req, res) {
        User.findOne({
                "name": req.body.name
            },
            function (err, user) {
                if (err) {
                    res.send(err);
                }

                console.log(user);
                if (!user) {
                    res.json({message: "Authentication failed. User not found", success: false});
                }
                else if (user) {
                    console.log(user);
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

router.route('/user')

    .post(function (req, res) {
        var user = new User();
        user.name = req.body.name;
        user.password = req.body.password;

        user.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({
                success: true,
                message: "User Created",
                user: user
            });
        })
    })

    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }

            res.json(users);
        });
    });

router.route('/user/:user_id')
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }

            res.json(user);
        })
    })
    .put(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }

            user.name = req.body.name;

            user.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({
                    success: true,
                    message: "User Updated",
                    user: user
                });
            })
        })
    })
    .delete(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            User.remove({
                _id: req.params.user_id
            }, function (err, user) {
                if (err) {
                    res.send(err);
                }

                res.json({
                    success: true,
                    message: "User Deleted"
                });
            });
        });
    });

app.use('/v1/rest', router);

app.listen(port);
console.log('REST server listening on port', port);
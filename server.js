var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    router = express.Router();

// Models
var User = require('./app/models/user');

mongoose.connect('mongodb://localhost:27017/REST');
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'Base API'});
});

router.route('/user')

    .post(function (req, res) {
        var user = new User();
        user.name = req.body.name;

        user.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({message: "User Created"});
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

                res.json({message: "User Updated"});
            })
        })
    })
    .delete(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
           User.remove({
               _id: req.params.user_id
           }, function(err, user) {
              if(err) {
                  res.send(err);
              }

               res.json({ message: "User Deleted"});
           });
        });
    });

app.use('/v1/rest', router);

app.listen(port);
console.log('REST server listening on port', port);
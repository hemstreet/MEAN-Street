var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    router = express.Router(),
    config = require('./config/config'),
    Auth = require('./lib/Auth.js'),
    auth = new Auth(),
    _ = require('lodash'),
    cookieParser = require('cookie-parser'),
    Model = require('./lib/Model.js'),
    modellUtil = new Model(),
    form = require('./lib/form.js');


var BASELIB = __dirname + '/lib';

app.set('models', BASELIB + '/models');

// Models
var _models = modellUtil.getModels();

_models.then(function (models) {

    mongoose.connect(config.database);
    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan('dev'));
    app.use('/', express.static(__dirname + '/app'));
    app.use('/v1/rest', router);

    app.get('/', function (req, res) {
        res.sendFile('/index.html');
    });

    // Include routes
    require('./lib/routes.js')({
        router: router,
        models: models,
        auth: auth
    });

    app.listen(port);

    console.log('REST server listening on port', port);
});

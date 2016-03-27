
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    argv = require('yargs').argv,
    port = argv.port || process.env.PORT || 3000,
    env = argv.env || process.env.ENV || 'dev',
    router = express.Router(),
    config = require('../config/config'),
    Auth = require('./Auth.js'),
    auth = new Auth(),
    _ = require('lodash'),
    cookieParser = require('cookie-parser'),
    Model = require('./Model.js'),
    model = new Model(),
    Db = require('./Database.js'),
    db = new Db({
        db: mongoose
    });

config.secret = argv.secret || config.secret;
config.database = argv.database || config.database;
config.baseUrl = argv.baseUrl || config.baseUrl;

model.getModels().then(function (models) {

    db.connect(config.database);
    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan(env));

    app.use('/api/v1', router);
    app.use('/' , express.static(__dirname + '/../app'));

    app.get('/', function (req, res) {
        res.sendFile('/index.html');
    });

    // Include routes
    var routeOptions = {
        router: router,
        models: models,
        auth: auth,
        config: config
    };

    // Public routes
    require('./routes/public.js')(routeOptions);

    // Initialize authorization
    require('./routes/auth.js')(routeOptions);

    // Private routes
    require('./routes/crud.js')(routeOptions);
    require('./routes/model.js')(routeOptions);

    app.listen(port);

    console.log('REST server listening on port', port);
});
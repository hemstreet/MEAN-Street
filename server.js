var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    port = process.env.PORT || 3000,
    env = process.env.ENV || 'dev',
    router = express.Router(),
    config = require('./config/config'),
    Auth = require('./lib/Auth.js'),
    auth = new Auth(),
    _ = require('lodash'),
    cookieParser = require('cookie-parser'),
    Model = require('./lib/Model.js'),
    modelUtil = new Model(),
    Db = require('./lib/Database.js'),
    db = new Db({
        db: mongoose
    });

modelUtil.getModels().then(function (models) {

    db.connect(config.database);
    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan(env));
    app.use('/', express.static(__dirname + '/app'));
    app.use('/v1/rest', router);

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

    require('./lib/routes/auth.js')(routeOptions);
    require('./lib/routes/crud.js')(routeOptions);
    require('./lib/routes/model.js')(routeOptions);

    app.listen(port);

    console.log('REST server listening on port', port);
});

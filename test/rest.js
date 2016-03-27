var express = require('express'),
    Server = require('../server.js'),
    server = new Server({
        modelPath: "/Users/jonhemstreet/Development/Sandbox/MEAN-Street/test/models/",
        app: express()
    });
var _ = require('lodash'),
    config = require('../config'),
    drink = require('./drink'),
    Utilities = require('../../../Utilities'),
    utilities = new Utilities(config);

_.each(drink.ingredients, function(value, key) {
    utilities.getMeasurements(value);
});




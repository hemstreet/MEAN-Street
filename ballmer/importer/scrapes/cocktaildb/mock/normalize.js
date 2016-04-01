var drink = require('./drink'),
    normalize = require('../normalize');

normalize.go(drink).then(function(drink) {
    console.log(drink);
});





var nodemon = require('nodemon');
var argv = require('yargs').argv;

module.exports = function (gulp, plugins, config) {

    function buildArgList() {
        var args = [];
        config.flags.forEach(function(key) {
            if (argv[key]) {
                args.push("--" + key + "=" + argv[key]);
            }
        });
        return args;
    };

    gulp.task('run', function () {
        nodemon({
            script: './example/server.js',
            ext: 'js html json',
            args: buildArgList()
        })
    });
}
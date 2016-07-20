var nodemon = require('nodemon');

module.exports = function (gulp, plugins, config) {
    gulp.task('run', function () {
        nodemon({
            script: './example/server.js',
            ext: 'js html json',
            args: config.flags.map(function (key) {
                return '--' + key;
            })
        })
    });
}
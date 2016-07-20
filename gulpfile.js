var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    config = require('./config/config');

gulp.task('default', function () {
    nodemon({
        script: 'example/server.js',
        ext: 'js html json',
        args: config.flags.map(function(key) {
            return '--' + key;
        })
    })
});
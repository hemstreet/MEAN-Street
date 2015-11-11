var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

var assetsDir = 'app/assets';

gulp.task('default', function () {
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: {
            'NODE_ENV': 'development',
            'ENV' : 'dev',
            'PORT' : 3000
        }
    })
});
let gulp = require('gulp');
let nodemon = require('nodemon');

gulp.task('start', function(){
  nodemon({
    script: 'app.js'
  });
});
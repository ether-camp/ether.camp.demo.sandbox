var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var destDir = './dist';
var service = {
  src: './src/service.js',
  dst: 'service.min.js'
};

gulp.task('service-browserify', function() {
  return browserify(service.src)
    .bundle()
    .pipe(source(service.dst))
    .pipe(gulp.dest(destDir));
});

gulp.task('default', ['service-browserify']);
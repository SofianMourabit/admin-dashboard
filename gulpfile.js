'use strict';

const gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
jshint = require('gulp-jshint'),
imagemin = require('gulp-imagemin'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
server = require('gulp-server-livereload'),
del = require('del');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/scss/application.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css'))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(gulp.dest('js'))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('img'))
  .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['css', 'js', 'img']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});


// Watch
gulp.task('watch', function () {
// Watch .scss files
gulp.watch('src/scss/**/*.scss', ['styles']);

// Watch .js files
gulp.watch('src/js/**/*.js', ['scripts']);

// Watch image files
gulp.watch('src/images/**/*', ['images']);
});

//server
gulp.task('server',['styles','scripts','images','watch'], function() {
  gulp.src('./')
  .pipe(server({
    defaultFile: 'index.html',
    port: 3000,
    livereload: {
      enable: true,
      filter: function (filename, cb) {
        cb(!/\.(sa|le)ss$|node_modules/.test(filename));
      }
    },
    open: true
  }));
});

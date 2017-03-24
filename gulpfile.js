'use strict';

const gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
jshint = require('gulp-jshint'),
notify = require('gulp-notify'),
server = require('gulp-server-livereload'),
del = require('del'),
svgSprite = require('gulp-svg-sprite');

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

// Images & Icons
let config = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: 'sprite', // destination foldeer
      sprite: 'sprite.svg', //sprite name
      example: true // Build sample page
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
};
gulp.task('sprite-page', function() {
  return gulp.src('src/images/**/*.svg')
  .pipe(svgSprite(config))
  .pipe(gulp.dest('.'))
  .pipe(notify({ message: 'Sprite page complete' }));
});

gulp.task('sprite-shortcut', function() {
  return gulp.src('sprite/sprite.svg')
  .pipe(gulp.dest('.'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
  .pipe(gulp.dest('img'))
  .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['css', 'js', 'img','sprite']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('server');
});


// Watch
gulp.task('watch', function () {
  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/*', ['images']);

  // Watch SVG files
  gulp.watch('src/images/icons/*', ['sprite-page']);

});

//server
gulp.task('server',['styles','scripts','images','sprite-page','watch'], function() {
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

"use strict";

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();

// Compile SCSS(SASS) files
gulp.task('bootstrap:scss', function compileBootstrap() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
});

// Compile SCSS(SASS) files
gulp.task('scss', gulp.series('bootstrap:scss', function compileScss() {
  return gulp.src(['./assets/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
}));

// Copy third party libraries from node_modules into /vendor
gulp.task('vendor:js', function() {
  return gulp.src([
    './node_modules/bootstrap/dist/js/*',
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js',
    './node_modules/popper.js/dist/umd/popper.*'
  ])
    .pipe(gulp.dest('./assets/js/vendor'));
});

// Configure the browserSync task and watch file path for change
gulp.task('dev', function browserDev() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['assets/scss/*.scss','assets/scss/**/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss', '!assets/scss/bootstrap/**'], gulp.series('scss'));
});
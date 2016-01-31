'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
<<<<<<< HEAD
const sass = require('gulp-sass');

var files = ['index.js', 'gulpfile.js', './lib/*.js', './test/*.spec.js',
 '!node_modules/**', '!*.json', './views/scss/**/*.scss'];
=======

var files = ['index.js', 'gulpfile.js', './lib/*.js', './test/*.spec.js',
 '!node_modules/**', '!*.json'];
>>>>>>> 198b6390331532745dd2b0c827e07c48c102d9a2

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

<<<<<<< HEAD
gulp.task('sass', () => {
  return gulp.src('views/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

=======
>>>>>>> 198b6390331532745dd2b0c827e07c48c102d9a2
gulp.task('mocha', () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha());
});

gulp.task('watch', () => {
<<<<<<< HEAD
  gulp.watch(files, ['sass', 'lint', 'mocha']);
=======
  return gulp.watch(files, ['lint', 'mocha']);
>>>>>>> 198b6390331532745dd2b0c827e07c48c102d9a2
});

gulp.task('default', ['watch', 'lint', 'mocha']);
